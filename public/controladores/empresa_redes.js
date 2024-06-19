import Utilidades from "../peticiones/utilidades.js";

const objUtilidades = new Utilidades();

let json_data
let dataEmpresaRedes = {
  headings: [
    "Nombre",
    "Url",
    "Opciones",
  ],
};

var opciones = {
  searchable: true,
  data: dataEmpresaRedes,
  columns: [
    {
      select: 2,
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
      "#tablaempresa_redes",
      opciones
    );
  }

  (async () => {
    const idEmpresa = 5;
    let ruta = "redes/list/" + idEmpresa;
    const jsonData = await objUtilidades.fetchResultListar(ruta);
    console.log('original', jsonData)
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
    $('#modal_empresa_redes').on('shown.bs.modal', function () {
      $(this).find('input').val('');
      $(this).find('input').prop('disabled', false);
      $("#mensajeError").hide();
    });
    $("#modal_empresa_redes").modal("show");
  });

  $("#btnGuardar").on("click", async function () {
    var jsonData
    var data_empresa_redes = {
      nombre: $("#redes_nombre").val(),
      url: $("#redes_url").val(),
      empresa_id: 5,
    };

    if ($('#empresa_redes_id').val() == '') {
      jsonData = await objUtilidades.fetchResultGuardar(
        "redes/create",
        data_empresa_redes
      );
    } else {
      var idRedes = $('#empresa_redes_id').val()
      jsonData = await objUtilidades.fetchResultEditar(
        "redes",
        idRedes,
        data_empresa_redes
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

  $(document).on("click", ".btn-editar", function () {
    $("#btnGuardar").show()
    var btn = $(this);
    var idRedes = btn.data("row");
    mostrar_data(idRedes)
  });

  $(document).on("click", ".btn-eliminar", async function () {
    var btn = $(this);
    var idRedes = btn.data("row");
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
            "redes",
            idRedes
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
    $("#modal_empresa_redes").modal("show");
    const data_fila = json_data.rows.filter(item => item.id === ID)[0];

    $('#modal_empresa_redes').on('shown.bs.modal', function () {
      $(this).find('input').prop('disabled', isDisabled);
      $("#empresa_redes_id").val(data_fila.id)
      $("#redes_nombre").val(data_fila.Nombre);
      $("#redes_url").val(data_fila.Url);
    });

  }
});
