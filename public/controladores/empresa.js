import Utilidades from "../peticiones/utilidades.js";

const objUtilidades = new Utilidades();

let dataExamen = {
    headings: [
        'Nombre', 'RUC', 'Rubro', 'Dirección', 'Teléfono',
        'Correo', 'Descripción', 'Historia', 'Opciones'
    ],
};

var opciones = {
    searchable: true,
    data: dataExamen,
    columns: [
        {
            select: 8,
            render: function (data, td, id, cellIndex) {
                if (data.length !== 0) {
                    return `<button type='button' class='btn btn-danger btn-sm ms-2 btn-eliminar' data-row='${[data[0].data]}'><i class='fas fa-trash'></i></button>`;
                }
            }
        }
    ]
}


$(document).ready(function () {
    var table
    if (simpleDatatables) {
        table = new simpleDatatables.DataTable('#tablaEmpresa', opciones);
    }

    (async () => {
        const jsonData = await objUtilidades.fetchResultListar('empresa/list')
        if (jsonData.message == "success") {
            table.insert(jsonData.rows);
        } else {
            Swal.fire({
                title: 'Error',
                text: 'Algo salio mal al cargar la información',
                icon: 'error',
                confirmButtonText: 'OK',
            });
        }
    })()


    $('#btn_modal').on("click", function () {
        $('#modal_empresa').modal("show")
    })

    $('#btnGuardar').on("click", async function () {
        var data_empresa = {
            'nombre': $('#empresa_nombre').val(),
            'numero_ruc': $('#empresa_numero_ruc').val(),
            'rubro': $('#empresa_rubro').val(),
            'direccion': $('#empresa_direccion').val(),
            'telefono': $('#empresa_telefono').val(),
            'correo': $('#empresa_correo').val(),
            'descripcion': $('#empresa_descripcion').val(),
            'historia': $('#empresa_historia').val(),
            'usuario_id': 1,
        }
        const jsonData = await objUtilidades.fetchResultGuardar('empresa/create', data_empresa)
        console.log(jsonData)
        if (jsonData.message == "success") {
            $('#mensajeError').hide();
            location.reload();
        } else {
            $('#mensajeError').text(jsonData.message);
            $('#mensajeError').show();
        }
    })

    $(document).on("click", ".btn-eliminar", async function () {
        debugger
        var btn = $(this);
        var idEmpresa = btn.data("row");
        try {
            Swal.fire({
                title: 'Eliminar',
                text: 'Seguro de eliminar este registro?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Aceptar',
                cancelButtonText: 'Cancelar'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    Swal.fire({
                        title: 'Cargando',
                        html: 'Por favor, espera...',
                        showConfirmButton: false
                    });
                    const jsonData = await objUtilidades.fetchResultEliminar('empresa', idEmpresa)
                    if (jsonData.message == "success") {
                        location.reload();
                    } else {
                        Swal.fire({
                            title: 'Error',
                            text: 'Algo salio mal al eliminar el registro',
                            icon: 'error',
                            confirmButtonText: 'OK',
                        });
                    }
                }
            });
        } catch (error) {
            console.error('Error al obtener los datos:', error);
        }
    });

})