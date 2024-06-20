import Utilidades from "../peticiones/utilidades.js";

const objUtilidades = new Utilidades();

let json_data;
let dataEmpresaColaborador = {
  headings: ["Nombre", "Contacto", "Asunto", "Motivo", "Opciones"],
};

var opciones = {
  searchable: true,
  data: dataEmpresaColaborador,
  columns: [
    {
      select: 4,
      render: function (data, td, id, cellIndex) {
        if (data.length !== 0) {
          return `<button type='button' class='btn btn-primary btn-sm ms-2 btn-ver' data-row='${data[0].data}'><i class='fas fa-eye'></i></button>
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
    table = new simpleDatatables.DataTable("#tablaAgenda", opciones);
  }

  (async () => {
    const idEmpresa = 24;
    let ruta = "agenda/list/" + idEmpresa;
    const jsonData = await objUtilidades.fetchResultListar(ruta);

    if (jsonData.message == "success") {
      json_data = { ...jsonData };
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

  $(document).on("click", ".btn-ver", async function () {
    var btn = $(this);
    var idRow = btn.data("row");
    $("#btnGuardar").hide();
    mostrar_data(idRow, true);
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
    $("#modal_agenda").modal("show");
    const data_fila = json_data.rows.filter((item) => item.id === ID)[0];

    $("#modal_agenda").on("shown.bs.modal", function () {
      $(this).find("input").prop("disabled", isDisabled);
      $("#empresa_agenda_id").val(data_fila.id);
      $("#empresa_agenda_usuario").val(data_fila.Nombre);
      $("#empresa_agenda_contacto").val(data_fila.Contacto);
      $("#empresa_agenda_asunto").val(data_fila.Asunto);
      $("#empresa_agenda_motivo").val(data_fila.Motivo);
      $("#empresa_agenda_empresa").val(data_fila.Empresa);
    });
  }
});
