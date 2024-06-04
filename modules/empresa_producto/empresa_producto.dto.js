export class EmpresaProductoDto {

    constructor(datos) {
        this.datos = datos
    }

    getData() {
        if (this.datos.length > 0) {
            return this.datos.map(data => {
                return {
                    "id": data.producto_id ?? '',
                    "Producto": data.producto_nombre ?? '',
                    "Categoría": data.producto_categoria ?? '',
                    "Stock": data.producto_stock ?? '',
                    "Precio": data.producto_precio ?? '',
                    "Moneda": data.producto_moneda ?? '',
                    "Estado": data.producto_estado ?? '',
                    'Opciones': data.producto_id ?? '',
                    'Más información':data.producto_id ?? '',
                    'Cotizar':data.producto_id ?? '',
                };
            });
        } else {
            return []
        }
    }
}

export default EmpresaProductoDto;