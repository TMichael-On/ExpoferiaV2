import Utilidades from "../peticiones/utilidades.js";

const objUtilidades = new Utilidades();

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
    table = new simpleDatatables.DataTable("#tablaempresa_redes", opciones);
  }

  (async () => {
    const jsonData = await objUtilidades.fetchResultListar("redes/list");
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
    $("#modal_empresa_redes").modal("show");
  });

  $("#btnGuardar").on("click", async function () {
    var data_empresa = {
      nombre: $("#redes_nombre").val(),
      url: $("#redes_url").val(),
      empresa_id: 5,
    };
    const jsonData = await objUtilidades.fetchResultGuardar(
      "redes/create",
      data_empresa
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
    $("#modal_ver_empresa_redes").modal("show");
    var btn = $(this);
    // var idRow = 4;
    var idRow = btn.data("row");
    console.log("Click ver: ", idRow);
    try {
      const jsonData = await objUtilidades.fetchResultVer("redes", idRow);
      if (jsonData.message === "success") {
        const rowData = jsonData.rows;
        const dto = {
          Nombre: rowData[0].Nombre,
          Url: rowData[0].Url,
        //   Empresa: rowData[0].Empresa,
        };
        $("#modal_redes_ver_nombre").text(dto.Nombre);
        $("#modal_redes_ver_url").text(dto.Url);
        // $("#modal_redes_ver_empresa").text(dto.Stock);
        // debugger;
      } else {
        console.error("Error al obtener los datos:", jsonData.message);
      }
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    }
  });

  $(document).on("click", ".btn-editar", function () {
    $("#modal_editar_empresa_redes").modal("show");
    var btn = $(this);
    // var idRedes = 4;
    var idRedes = btn.data("row");
    $("#btnGuardarEditar")
      .off("click")
      .on("click", async function () {
        let data_empresa_redes = {};
        if ($("#empresa_redes_nombre_editar").val().trim() !== "") {
          data_empresa_redes.nombre = $(
            "#empresa_redes_nombre_editar"
          )
            .val()
            .trim();
        }
        if ($("#empresa_redes_url_editar").val().trim() !== "") {
          data_empresa_redes.url = $(
            "#empresa_redes_url_editar"
          )
            .val()
            .trim();
        }
        // if ($("#empresa_redes_empresa_editar").val().trim() !== "") {
        //   data_empresa_redes.empresa = $("#empresa_redes_empresa_editar")
        //     .val()
        //     .trim();
        // }
        if (data_empresa_redes.length !== 0) {
          data_empresa_redes.empresa_id = 5;
          const jsonData = await objUtilidades.fetchResultEditar(
            "redes",
            idRedes,
            data_empresa_redes
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
});
