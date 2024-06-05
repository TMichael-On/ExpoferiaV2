import Utilidades from "../peticiones/utilidades.js";

const objUtilidades = new Utilidades();

let dataEmpresa = {
  headings: [
    "Nombre",
    "RUC",
    "Rubro",
    "Dirección",
    "Teléfono",
    "Correo",
    "Descripción",
    "Historia",
    "Opciones",
  ],
};

var opciones = {
  searchable: false,
  paging: false,
  sortable: false,
  data: dataEmpresa,
  columns: [
    {
      select: 8,
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
  let cropper;
  if (simpleDatatables) {
    table = new simpleDatatables.DataTable("#tablaEmpresa", opciones);
  }

  (async () => {
    const jsonData = await objUtilidades.fetchResultListar("empresa/list");
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
    $("#modal_empresa").modal("show");
  });

  $(document).ready(function () {
    // let cropper;
    let imgElement = document.getElementById("img");
    const defaultFile = "../../public/sb-admin/image/default.jpg";

    $("#empresa_cargarimage").on("change", function (e) {
      console.log("Se cargó una imagen");
      if (e.target.files && e.target.files[0]) {
        const reader = new FileReader();
        reader.onload = function (event) {
          const image = document.getElementById('imagen_a_recortar');
          image.src = event.target.result;
          $('#modal_recortar_imagen').modal('show');

          if (cropper) {
            cropper.destroy();
          }

          cropper = new Cropper(image, {
            aspectRatio: 1,
            viewMode: 1,
            minContainerWidth: 400,
            minContainerHeight: 400,
          });
        };
        reader.readAsDataURL(e.target.files[0]);
      } else {
        imgElement.src = defaultFile;
      }
    });

    $("#btn_recortar_imagen").on("click", function () {
      const canvas = cropper.getCroppedCanvas({
        width: 200,
        height: 200,
      });
      imgElement.src = canvas.toDataURL();
      $('#modal_recortar_imagen').modal('hide');
    });
  });

  $(document).ready(function () {
    let cropper;
    let imgElement = document.getElementById("img");
    const defaultFile = "../../public/sb-admin/image/default.jpg";

    $("#empresa_cargarimage_editar").on("change", function (e) {
      console.log("Se cargó una imagen");
      if (e.target.files && e.target.files[0]) {
        const reader = new FileReader();
        reader.onload = function (event) {
          const image = document.getElementById('imagen_a_recortar');
          image.src = event.target.result;
          $('#modal_recortar_imagen_editar').modal('show');

          if (cropper) {
            cropper.destroy();
          }

          cropper = new Cropper(image, {
            aspectRatio: 1,
            viewMode: 1,
            minContainerWidth: 400,
            minContainerHeight: 400,
          });
        };
        reader.readAsDataURL(e.target.files[0]);
      } else {
        imgElement.src = defaultFile;
      }
    });

    $("#modal_recortar_imagen_editar").on("click", function () {
      const canvas = cropper.getCroppedCanvas({
        width: 200,
        height: 200,
      });
      imgElement.src = canvas.toDataURL();
      $('#modal_recortar_imagen_editar').modal('hide');
    });
  });

  $("#btnGuardar").on("click", async function () {
    let imageLoad = "default.jpg";
    let youtubeLoad = "https://www.youtube.com/";
    if ($("#empresa_cargarvideo").val())
      youtubeLoad = $("#empresa_cargarvideo").val();
    if ($("#empresa_cargarimage").val()) {
      let name = $("#empresa_nombre").val();
      let date = new Date();
      let year = date.getFullYear();
      let month = ("0" + (date.getMonth() + 1)).slice(-2);
      let day = ("0" + date.getDate()).slice(-2);
      let hour = ("0" + date.getHours()).slice(-2);
      let minute = ("0" + date.getMinutes()).slice(-2);
      imageLoad = `img_${name}_${year}${month}${day}${hour}${minute}.png`;
    }

    var data_empresa = {
      nombre: $("#empresa_nombre").val(),
      numero_ruc: $("#empresa_numero_ruc").val(),
      rubro: $("#empresa_rubro").val(),
      direccion: $("#empresa_direccion").val(),
      telefono: $("#empresa_telefono").val(),
      correo: $("#empresa_correo").val(),
      descripcion: $("#empresa_descripcion").val(),
      historia: $("#empresa_historia").val(),
      image: "",
      video: youtubeLoad,
      usuario_id: 8,
    };
    cropper.getCroppedCanvas().toBlob(async blob => {
      debugger
      data_empresa.image = blob
      const jsonData = await objUtilidades.fetchResultGuardar(
        "empresa/create",
        data_empresa,
        true
      );
      if (jsonData.message == "success") {
        let ruta = "public/sb-admin/image/" + imageLoad;
        $("#mensajeError").hide();
        // location.reload();
        console.log('Imagen guardada correctamente')
      } else {
        $("#mensajeError").text(jsonData.message);
        $("#mensajeError").show();
      }
    })
    // console.log(jsonData);
  });

  $(document).on("click", ".btn-ver", async function () {
    var btn = $(this);
    var idRow = btn.data("row");
    try {
      const jsonData = await objUtilidades.fetchResultVer("empresa/", idRow);
      if (jsonData.message === "success") {
        const rowData = jsonData.rows[0];
        const dto = {
          Nombre: rowData.Nombre,
          RUC: rowData.RUC,
          Rubro: rowData.Rubro,
          Dirección: rowData.Dirección,
          Teléfono: rowData.Teléfono,
          Correo: rowData.Correo,
          Descripción: rowData.Descripción,
          Historia: rowData.Historia,
          Imagen: rowData.Imagen,
          Video: rowData.Video,
        };
        // debugger
        $("#modal_ver_nombre").text(dto.Nombre);
        $("#modal_ver_ruc").text(dto.RUC);
        $("#modal_ver_rubro").text(dto.Rubro);
        $("#modal_ver_direccion").text(dto.Dirección);
        $("#modal_ver_telefono").text(dto.Teléfono);
        $("#modal_ver_correo").text(dto.Correo);
        $("#modal_ver_descripcion").text(dto.Descripción);
        $("#modal_ver_video").text(dto.Video);
        $("#modal_ver_historia").text(dto.Historia);

        $("#modal_ver_empresa").modal("show");
      } else {
        console.error("Error al obtener los datos:", jsonData.message);
      }
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    }
  });

  $(document).on("click", ".btn-editar", function () {
    $("#modal_editar_empresa").modal("show");
    var btn = $(this);
    var idEmpresa = btn.data("row");
    $("#btnGuardarEditar")
      .off("click")
      .on("click", async function () {
        let data_empresa = {};

        if ($("#empresa_nombre_editar").val().trim() !== "") {
          data_empresa.nombre = $("#empresa_nombre_editar").val().trim();
        }
        if ($("#empresa_numero_ruc_editar").val().trim() !== "") {
          data_empresa.numero_ruc = $("#empresa_numero_ruc_editar")
            .val()
            .trim();
        }
        if ($("#empresa_rubro_editar").val().trim() !== "") {
          data_empresa.rubro = $("#empresa_rubro_editar").val().trim();
        }
        if ($("#empresa_direccion_editar").val().trim() !== "") {
          data_empresa.direccion = $("#empresa_direccion_editar").val().trim();
        }
        if ($("#empresa_telefono_editar").val().trim() !== "") {
          data_empresa.telefono = $("#empresa_telefono_editar").val().trim();
        }
        if ($("#empresa_correo_editar").val().trim() !== "") {
          data_empresa.correo = $("#empresa_correo_editar").val().trim();
        }
        if ($("#empresa_descripcion_editar").val().trim() !== "") {
          data_empresa.descripcion = $("#empresa_descripcion_editar")
            .val()
            .trim();
        }
        if ($("#empresa_historia_editar").val().trim() !== "") {
          data_empresa.historia = $("#empresa_historia_editar").val().trim();
        }
        if (data_empresa.length !== 0) {
          data_empresa.usuario_id = 8;
          const jsonData = await objUtilidades.fetchResultEditar(
            "empresa",
            idEmpresa,
            data_empresa
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
    var btn = $(this);
    var idEmpresa = btn.data("row");
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
            "empresa",
            idEmpresa
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
