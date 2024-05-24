

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

    if (simpleDatatables) {
        table = new simpleDatatables.DataTable('#tablaempresa_colaborador', opciones);
    }

    (async () => {
        const jsonData = await utilidadesObj.eliminar('examen', data)
        if (jsonData.error) {
            Swal.fire({
                title: 'Error',
                text: jsonData.error,
                icon: 'error',
                confirmButtonText: 'OK',
            });
        }
    })()

    $('#btn_modal').on("click", function () {
        $('#modal_empresa_colaborador').modal("show")
    })

    $('#btnGuardar').on("click", async function () {
        console.log('guardar')
    })

})