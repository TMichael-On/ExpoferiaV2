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
                    'Opciones': data.empresa_id ?? '',
                };
            });
        } else {
            return []
        }
    }
}

export default EmpresaDto;