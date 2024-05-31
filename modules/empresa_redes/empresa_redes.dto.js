export class EmpresaRedesDto {

    constructor(datos) {
        this.datos = datos
    }

    getData() {
        if (this.datos.length > 0) {
            return this.datos.map(data => {
                return {
                    "id" : data.redes_id ?? '',
                    "Nombre" : data.redes_nombre ?? '',
                    "Url" : data.redes_url ?? '',
                    "Opciones" : data.redes_id ?? '',
                };
            });
        } else {
            return []
        }
    }
}

export default EmpresaRedesDto;