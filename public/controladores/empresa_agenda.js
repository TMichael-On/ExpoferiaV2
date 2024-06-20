import Utilidades from "../peticiones/utilidades.js";

const objUtilidades = new Utilidades();

let json_data
let dataEmpresaColaborador = {
  headings: ["Asunto", "Motivo"],
};

var opciones = {
  searchable: true,
  data: dataEmpresaColaborador,
  columns: [
    {
      select: 3,
      render: function (data, td, id, cellIndex) {
        if (data.length !== 0) {
          return `<button type='button' class='btn btn-primary btn-sm ms-2 btn-ver' data-row='${data[0].data}'><i class='fas fa-eye'></i></button>
          <button type='button' class='btn btn-warning btn-sm ms-2 btn-editar' data-row='${data[0].data}'><i class='fas fa-edit'></i></button>
          <button type='button' class='btn btn-danger btn-sm ms-2 btn-eliminar' data-row='${data[0].data}'><i class='fas fa-trash'></i></button>
          `;
        }
      },
    },
  ],
};

$(document).ready(function () {
  var table;
  if (simpleDatatables) {
    table = new simpleDatatables.DataTable(
      "#tablaAgenda",
      opciones
    );
  }

  (async () => {
    const idEmpresa = 5;
    let ruta = "agenda/list/" + idEmpresa;
    const jsonData = await objUtilidades.fetchResultListar(ruta);

    if (jsonData.message == "success") {
      json_data = { ...jsonData }
      table.insert(jsonData.rows);
    } else {
      Swal.fire({
        title: "Error",
        text: "Algo salio mal al cargar la información",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  })();

  $("#btn_modal").on("click", function () {
    $("#btnGuardar").show()
    $('#modal_empresa_colaborador').on('shown.bs.modal', function () {
      $(this).find('input').val('');
      $(this).find('input').prop('disabled', false);
      $(this).find('[src]').attr('src', '');
      $("#mensajeError").hide();
    });
    $("#modal_empresa_colaborador").modal("show");
  });

  $("#btnGuardar").on("click", async function () {
    var jsonData
    var data_empresa_colaborador = {
      nombre_completo: $("#empresa_colaborador_nombre").val(),
      telefono: $("#empresa_colaborador_telefono").val(),
      area: $("#empresa_colaborador_area").val(),
      image: "",
      empresa_id: 5,
    };

    if ($('#empresa_colaborador_id').val() != '') {
      var idColaborador = parseInt($('#empresa_colaborador_id').val(), 10)
      const s = $('#img_colaborador').attr('src')
      const data_fila = json_data.rows.filter(item => item.id === idColaborador)[0];
      const img_colaboradorO = '/imagenes/' + data_fila.Imagen

      if (s == img_colaboradorO) {
        data_empresa_colaborador.image = data_fila.Imagen
      } else {
        data_empresa_colaborador.image = await obtenerBlob()
      }
      jsonData = await objUtilidades.fetchResultEditar(
        "colaborador",
        idColaborador,
        data_empresa_colaborador,
        true
      );
    }

    if (jsonData.message == "success") {
      $("#mensajeError").hide();
      location.reload();
    } else {
      $("#mensajeError").text(jsonData.message);
      $("#mensajeError").show();
    }
  });

  $(document).on("click", ".btn-ver", async function () {
    var btn = $(this);
    var idRow = btn.data("row");
    $("#btnGuardar").hide()
    mostrar_data(idRow, true)
  });

  $(document).on("click", ".btn-eliminar", async function () {
    var btn = $(this);
    var idColaborador = btn.data("row");
    try {
      Swal.fire({
        title: "Eliminar",
        text: "Seguro de eliminar este registro?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Aceptar",
        cancelButtonText: "Cancelar",
      }).then(async (result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Cargando",
            html: "Por favor, espera...",
            showConfirmButton: false,
          });
          const jsonData = await objUtilidades.fetchResultEliminar(
            "colaborador",
            idColaborador
          );
          if (jsonData.message == "success") {
            location.reload();
          } else {
            Swal.fire({
              title: "Error",
              text: "Algo salio mal al eliminar el registro",
              icon: "error",
              confirmButtonText: "OK",
            });
          }
        }
      });
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    }
  });

  function mostrar_data(ID, isDisabled = false) {
    $("#modal_empresa_colaborador").modal("show");
    const data_fila = json_data.rows.filter(item => item.id === ID)[0];

    $('#modal_empresa_colaborador').on('shown.bs.modal', function () {
      $(this).find('input').prop('disabled', isDisabled);
      $("#empresa_colaborador_id").val(data_fila.id)
      $("#empresa_colaborador_nombre").val(data_fila.Nombre)
      $("#empresa_colaborador_telefono").val(data_fila.Teléfono)
      $("#empresa_colaborador_area").val(data_fila.Área)
      $('#img_colaborador').attr('src', `/imagenes/${data_fila.Imagen}`)
    });
  }

});
