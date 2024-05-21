export class EmpresaProductoDto {

    constructor(datos) {
        this.datos = datos
    }

    getData() {
        if (this.datos.length > 0) {
            return this.datos.map(data => {
                return {
                    "id" : data.producto_id ?? '',
                    "nombre" : data.producto_nombre ?? '',
                    "categoria" : data.producto_categoria ?? '',
                    "stock" : data.producto_stock ?? '',
                    "precio" : data.producto_precio ?? '',
                    "moneda" : data.producto_moneda ?? '',
                    "estado" : data.producto_estado ?? '',
                    "empresa_id" : data.empresa_id ?? ''
                };
            });
        } else {
            return []
        }
    }
}

export default EmpresaProductoDto;