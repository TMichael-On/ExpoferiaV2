export class EmpresaColaboradorDto {

    constructor(datos) {
        this.datos = datos
    }

    getData() {
        if (this.datos.length > 0) {
            return this.datos.map(data => {
                return {
                    "id" : data.visita_id ?? '',
                    "Nombre" : data.usuario_apellido + ', ' +data.usuario_apellido ?? '',
                    "Contacto" : data.usuario_correo ?? '',
                };
            });
        } else {
            return []
        }
    }
}

export default EmpresaColaboradorDto;