import Utilidades from "../peticiones/utilidades.js";

const objUtilidades = new Utilidades();

let dataEmpresaProducto = {
  headings: [
    "Nombre",
    "Categoría",
    "Stock",
    "Precio",
    "Moneda",
    "Estado",
    "Opciones",
  ],
};

var opciones = {
  searchable: true,
  data: dataEmpresaProducto,
  columns: [
    {
      select: 6,
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
    table = new simpleDatatables.DataTable("#tablaempresa_producto", opciones);
  }

  (async () => {
    const idEmpresa = 5;
    let ruta = "producto/list/" + idEmpresa;
    const jsonData = await objUtilidades.fetchResultListar(ruta);
    if (jsonData.message == "success") {
      jsonData.rows = jsonData.rows.map((row) => {
        for (let key in row) {
          if (typeof row[key] === "string" && row[key].length > 6) {
            row[key] = row[key].substring(0, 6) + "...";
          }
        }
        row.Estado = row.Estado === "1" ? "activo" : "inactivo";
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
    $("#modal_empresa_producto").modal("show");
  });

  $("#btnGuardar").on("click", async function () {
    var data_empresa = {
      nombre: $("#empresa_producto_nombre").val(),
      categoria: $("#empresa_producto_categoria").val(),
      stock: $("#empresa_producto_stock").val(),
      precio: $("#empresa_producto_precio").val(),
      moneda: $("#empresa_producto_moneda").val(),
      empresa_id: 5,
    };
    const jsonData = await objUtilidades.fetchResultGuardar(
      "producto/create",
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
    $("#modal_ver_empresa_producto").modal("show");
    var btn = $(this);
    // var idRow = 4;
    var idRow = btn.data("row");
    console.log("Click ver: ", idRow);
    try {
      const jsonData = await objUtilidades.fetchResultVer("producto", idRow);
      if (jsonData.message === "success") {
        const rowData = jsonData.rows;

        jsonData.rows = jsonData.rows.map((row) => {
          row.Estado = row.Estado === "1" ? "activo" : "inactivo";
          return row;
        });
        const dto = {
          Nombre: rowData[0].Nombre,
          Categoría: rowData[0].Categoría,
          Stock: rowData[0].Stock,
          Precio: rowData[0].Precio,
          Moneda: rowData[0].Moneda,
          Estado: rowData[0].Estado,
        };
        $("#modal_producto_ver_nombre").text(dto.Nombre);
        $("#modal_producto_ver_categoria").text(dto.Categoría);
        $("#modal_producto_ver_stock").text(dto.Stock);
        $("#modal_producto_ver_precio").text(dto.Precio);
        $("#modal_producto_ver_moneda").text(dto.Moneda);
        $("#modal_producto_ver_estado").text(dto.Estado);
        // debugger;
      } else {
        console.error("Error al obtener los datos:", jsonData.message);
      }
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    }
  });

  $(document).on("click", ".btn-editar", function () {
    $("#modal_editar_empresa_producto").modal("show");
    var btn = $(this);
    // var idProducto = 4;
    var idProducto = btn.data("row");
    $("#btnGuardarEditar")
      .off("click")
      .on("click", async function () {
        let data_empresa_producto = {};
        if ($("#empresa_producto_nombre_editar").val().trim() !== "") {
          data_empresa_producto.nombre = $(
            "#empresa_producto_nombre_editar"
          )
            .val()
            .trim();
        }
        if ($("#empresa_producto_categoria_editar").val().trim() !== "") {
          data_empresa_producto.categoria = $(
            "#empresa_producto_categoria_editar"
          )
            .val()
            .trim();
        }
        if ($("#empresa_producto_stock_editar").val().trim() !== "") {
          data_empresa_producto.stock = $("#empresa_producto_stock_editar")
            .val()
            .trim();
        }
        if ($("#empresa_producto_precio_editar").val().trim() !== "") {
          data_empresa_producto.precio = $("#empresa_producto_precio_editar")
            .val()
            .trim();
        }
        if ($("#empresa_producto_moneda_editar").val().trim() !== "") {
          data_empresa_producto.moneda = $("#empresa_producto_moneda_editar")
            .val()
            .trim();
        }
        if ($("#empresa_producto_estado_editar").val().trim() !== "") {
          data_empresa_producto.estado = $("#empresa_producto_estado_editar")
            .val()
            .trim();
        }
        // if ($("#empresa_producto_empresa_editar").val().trim() !== "") {
        //   data_empresa.empresa_id = $("#empresa_producto_empresa_editar").val().trim();
        // }
        if (data_empresa_producto.length !== 0) {
          data_empresa_producto.empresa_id = 5;
          const jsonData = await objUtilidades.fetchResultEditar(
            "producto",
            idProducto,
            data_empresa_producto
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
    var idProducto = btn.data("row");
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
            "producto",
            idProducto
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
