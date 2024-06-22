export class EmpresaDto {

    constructor(datos) {
        this.datos = datos
    }

    getData() {
        if (this.datos.length > 0) {
            return this.datos.map(data => {
                return {
                    'id': data.empresa_id ?? '',
                    'Nombre': data.empresa_nombre ?? '',
                    'RUC': data.empresa_numero_ruc ?? '',
                    'Rubro': data.empresa_rubro ?? '',
                    'Dirección': data.empresa_direccion ?? '',
                    'Teléfono': data.empresa_telefono ?? '',
                    'Correo': data.empresa_correo ?? '',
                    'Descripción': data.empresa_descripcion ?? '',
                    'Historia': data.empresa_historia ?? '',
                    'Imagen': data.empresa_imagen ?? '',
                    'Imagen_presentacion': data.empresa_img_presentacion ?? '',
                    'Imagen_historia': data.empresa_img_historia ?? '',
                    'Video': data.empresa_video ?? '',
                    'Estado': data.empresa_estado ?? '',
                    'Opciones': data.empresa_id ?? '',
                };
            });
        } else {
            return []
        }
    }
}

export default EmpresaDto;