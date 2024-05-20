$(document).ready(function () {
    
    $('#btn_modal').on("click", function() {
        $('#modal_empresa').modal("show")
    })

    $('#btnGuardar').on("click", async function() {   
        console.log('guardar')
    })

})