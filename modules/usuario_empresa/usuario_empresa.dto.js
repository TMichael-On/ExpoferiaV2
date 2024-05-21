export class UsuarioEmpresaDto {

    constructor(datos) {
        this.datos = datos
    }

    getData() {
        if (this.datos.length > 0) {
            return this.datos.map(data => {
                return {
                    "id" : data.usuario_id ?? '',
                    "nombre" : data.usuario_nombre ?? '',
                    "apellido" : data.usuario_apellido ?? '',
                    "correo" : data.usuario_correo ?? '',
                    "telefono" : data.usuario_telefono ?? '',
                    "contrasena" : data.usuario_contrasena ?? '',
                    "fecha_registro" : data.usuario_fecha_registro ?? '',
                };
            });
        } else {
            return []
        }
    }
}

export default UsuarioEmpresaDto;