export class EmpresaDto {

    constructor(datos) {
        this.datos = datos
    }

    getData() {
        if (this.datos.length > 0) {
            return this.datos.map(data => {
                return {
                    'id': data.empresa_id ?? '',
                    'nombre': data.empresa_nombre ?? '',
                    'numero_ruc': data.empresa_numero_ruc ?? '',
                    'rubro': data.empresa_rubro ?? '',
                    'direccion': data.empresa_direccion ?? '',
                    'telefono': data.empresa_telefono ?? '',
                    'correo': data.empresa_correo ?? '',
                    'descripcion': data.empresa_descripcion ?? '',
                    'historia': data.empresa_historia ?? '',
                    'usuario_id': data.empresa_usuario_id ?? '',
                };
            });
        } else {
            return []
        }
    }
}

export default EmpresaDto;