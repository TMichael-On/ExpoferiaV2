import Utilidades from "../peticiones/utilidades.js";

const objUtilidades = new Utilidades();

let dataEmpresaColaborador = {
  headings: ["Nombre", "Teléfono", "Área", "Opciones"],
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
      "#tablaempresa_colaborador",
      opciones
    );
  }

  (async () => {
    const idEmpresa = 1;
    let ruta = "colaborador/list/" + idEmpresa;
    const jsonData = await objUtilidades.fetchResultListar(ruta);
    if (jsonData.message == "success") {
      jsonData.rows = jsonData.rows.map((row) => {
        for (let key in row) {
          if (typeof row[key] === "string" && row[key].length > 6) {
            row[key] = row[key].substring(0, 6) + "...";
          }
        }
        return row;
      });
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
    $("#modal_empresa_colaborador").modal("show");
  });

  $("#btnGuardar").on("click", async function () {
    var data_empresa_colaborador = {
      nombre_completo: $("#empresa_colaborador_nombre").val(),
      telefono: $("#empresa_colaborador_telefono").val(),
      area: $("#empresa_colaborador_area").val(),
      empresa_id: 1,
    };
    const jsonData = await objUtilidades.fetchResultGuardar(
      "colaborador/create",
      data_empresa_colaborador
    );
    console.log(jsonData);
    if (jsonData.message == "success") {
      $("#mensajeError").hide();
      location.reload();
    } else {
      $("#mensajeError").text(jsonData.message);
      $("#mensajeError").show();
    }
  });

  $(document).on("click", ".btn-ver", async function () {
    $("#modal_ver_empresa_colaborador").modal("show");
    var btn = $(this);
    // var idRow = 1;
    var idRow = btn.data("row");
    console.log("Click ver: ", idRow);
    try {
      const jsonData = await objUtilidades.fetchResultVer(
        "colaborador",
        idRow
      );
      if (jsonData.message === "success") {
        const rowData = jsonData.rows;
        const dto = {
          Nombre: rowData[0].Nombre,
          Teléfono: rowData[0].Teléfono,
          Área: rowData[0].Área,
        };
        
        $("#modal_colaborador_ver_nombre").text(dto.Nombre);
        $("#modal_colaborador_ver_telefono").text(dto.Teléfono);
        $("#modal_colaborador_ver_area").text(dto.Área);
        // debugger;
      } else {
        console.error("Error al obtener los datos:", jsonData.message);
      }
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    }
  });

  $(document).on("click", ".btn-editar", function () {
    $("#modal_editar_empresa_colaborador").modal("show");
    var btn = $(this);
    // var idColaborador = 1;
    var idColaborador = btn.data("row");
    $("#btnGuardarEditar")
      .off("click")
      .on("click", async function () {
        let data_empresa_colaborador = {};

        if ($("#empresa_colaborador_nombre_editar").val().trim() !== "") {
          data_empresa_colaborador.nombre_completo = $("#empresa_colaborador_nombre_editar").val().trim();
        }
        if ($("#empresa_colaborador_telefono_editar").val().trim() !== "") {
          data_empresa_colaborador.telefono = $("#empresa_colaborador_telefono_editar").val().trim();
        }
        if ($("#empresa_colaborador_area_editar").val().trim() !== "") {
          data_empresa_colaborador.area = $("#empresa_colaborador_area_editar").val().trim();
        }
        // if ($("#empresa_colaborador_empresa_editar").val().trim() !== "") {
        //   data_empresa.empresa_id = $("#empresa_colaborador_empresa_editar").val().trim();
        // }
        if (data_empresa_colaborador.length !== 0) {
          data_empresa_colaborador.usuario_id = 5;
          const jsonData = await objUtilidades.fetchResultEditar(
            "colaborador",
            idColaborador,
            data_empresa_colaborador
          );
          if (jsonData.message == "success") {
            $("#mensajeError").hide();
            location.reload();
          } else {
            $("#mensajeError").text(jsonData.message);
            $("#mensajeError").show();
          }
        } else $("#modal_editar_empresa").modal("dismiss");
      });
  });

  $(document).on("click", ".btn-eliminar", async function () {
    // debugger;
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
});
