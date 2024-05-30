let dataExamen = {
    headings: [
        'Nombre', 'Categoria', 'Stock', 'Precio', 'Moneda',
        'Estado', 'Opciones'
    ],
};

var opciones = {
    searchable: true,
    data: dataExamen,
    columns: [
        {
            select: 6,
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
        table = new simpleDatatables.DataTable('#tablaempresa_producto', opciones);
    }
    $('#btn_modal').on("click", function() {
        $('#modal_empresa_producto').modal("show")
    })

    $('#btnGuardar').on("click", async function() {   
        console.log('guardar')
    })

})