import Utilidades from "../peticiones/utilidades.js";

const objUtilidades = new Utilidades();

let json_data
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
    "Estado",
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
      select: 6,
      render: function (data, td, id, cellIndex) {
        if (data.length !== 0) {
          var info = data[0].data
          if (data[0].data.length > 18) {
            info = data[0].data.substring(0, 18) + "...";
          }
          return info
        }
      },
    },
    {
      select: 7,
      render: function (data, td, id, cellIndex) {
        if (data.length !== 0) {
          var info = data[0].data
          if (data[0].data.length > 18) {
            info = data[0].data.substring(0, 18) + "...";
          }
          return info
        }
      },
    },
    {
      select: 8,
      render: function (data, td, id, cellIndex) {
        if (data.length !== 0) {
          if (data[0].data == 0)
            return `<span class="badge text-bg-secondary">Ocultar</span>`;
          return `<span class="badge text-bg-success">Mostrar</span>`;
        }
      },
    },
    {
      select: 9,
      render: function (data, td, id, cellIndex) {
        if (data.length !== 0) {
          return `<button type='button' class='btn btn-primary btn-sm ms-2 btn-ver' data-row='${data[0].data}'><i class='fas fa-eye'></i></button>
          <button type='button' class='btn btn-warning btn-sm ms-2 btn-editar' data-row='${data[0].data}'><i class='fas fa-edit'></i></button>
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
    const jsonData = await objUtilidades.fetchResultListar("empresa/list/id");
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
    $('#modal_empresa').on('shown.bs.modal', function () {
      $(this).find('input').val('');
      $(this).find('input').prop('disabled', false);
      $(this).find('textarea').val('');
      $(this).find('textarea').prop('disabled', false);
      $(this).find('textarea').prop('disabled', false);
      $(this).find('[src]').attr('src', '');
      $("#mensajeError").hide();
    });
    $("#modal_empresa").modal("show");
  });

  $('#btn-cargar-video').click(function () {
    var enlace = $('#empresa_cargarvideo').val();
    $('#video_empresa').attr('src', enlace);
    $('#video_empresa').show();
  });

  let imgElement = $("#img_empresa")[0];
  const defaultFile = "/sb-admin/image/default.jpg";

  $("#empresa_cargarimage").on("change", function (e) {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = function (event) {
        const image = $('#imagen_a_recortar')[0]
        image.src = event.target.result;
        $('#modal_recortar_imagen').modal('show');

        if (cropper) {
          cropper.destroy();
        }
        cropper = new Cropper(image, {
          aspectRatio: 1.8,
          autoCropArea: 1,
          viewMode: 1,
          // minContainerWidth: 400,
          // minContainerHeight: 400,
        });
        // 
        // $('#empresa_cargarimage').val('asd');        
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

  $("#btnGuardar").on("click", async function () {
    var jsonData
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
      video: $("#empresa_cargarvideo").val(),
      estado: $("#empresa_estado").val(),
      usuario_id: 8,
    };

    if (!$('#img_empresa').attr('src')) {
      $("#mensajeError").text("Imagen requerida");
      $("#mensajeError").show();
      return
    }
    async function obtenerBlob() {
      return new Promise((resolve, reject) => {
        cropper.getCroppedCanvas().toBlob((blob) => {
          resolve(blob);
        });
      });
    }

    if ($('#empresa_id').val() != '') {
      var idEmpresa = parseInt($('#empresa_id').val(), 10)
      const s = $('#img_empresa').attr('src')
      const data_fila = json_data.rows.filter(item => item.id === idEmpresa)[0];
      const img_empresaO = '/imagenes/' + data_fila.Imagen

      if (s == img_empresaO) {
        data_empresa.image = data_fila.Imagen
      } else {
        data_empresa.image = await obtenerBlob()
      }

      jsonData = await objUtilidades.fetchResultEditar(
        "empresa",
        idEmpresa,
        data_empresa,
        true
      );
    }
    if (jsonData.message == "success") {
      $("#mensajeError").hide();
      location.reload();
      console.log('Imagen guardada correctamente')
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
    var idEmpresa = btn.data("row");
    mostrar_data(idEmpresa)
  });

  function mostrar_data(ID, isDisabled = false) {
    $("#mensajeError").hide();
    $("#modal_empresa").modal("show");
    const data_fila = json_data.rows.filter(item => item.id === ID)[0];

    $('#modal_empresa').on('shown.bs.modal', function () {
      $(this).find('input').prop('disabled', isDisabled);
      $(this).find('textarea').prop('disabled', isDisabled);
      $(this).find('select').prop('disabled', isDisabled);
      $("#empresa_id").val(data_fila.id)
      $("#empresa_nombre").val(data_fila.Nombre)
      $("#empresa_numero_ruc").val(data_fila.RUC)
      $("#empresa_rubro").val(data_fila.Rubro)
      $("#empresa_direccion").val(data_fila.Dirección)
      $("#empresa_telefono").val(data_fila.Teléfono)
      $("#empresa_correo").val(data_fila.Correo)
      $("#empresa_descripcion").val(data_fila.Descripción)
      $("#empresa_historia").val(data_fila.Historia)
      $("#empresa_estado").val(data_fila.Estado)
      $('#img_empresa').attr('src', `/imagenes/${data_fila.Imagen}`)
      $('#video_empresa').attr('src', data_fila.Video)
      $("#empresa_cargarvideo").val(data_fila.Video)
      $('#video_empresa').show();
    });
  }
});
