export class EmpresaRedesDto {

    constructor(datos) {
        this.datos = datos
    }

    getData() {
        if (this.datos.length > 0) {
            return this.datos.map(data => {
                return {
                    "id" : data.redes_id ?? '',
                    "nombre" : data.redes_nombre ?? '',
                    "url" : data.redes_url ?? '',
                    "empresa_id" : data.empresa_id ?? '', 
                };
            });
        } else {
            return []
        }
    }
}

export default EmpresaRedesDto;