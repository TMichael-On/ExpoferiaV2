export class EmpresaColaboradorDto {

    constructor(datos) {
        this.datos = datos
    }

    getData() {
        if (this.datos.length > 0) {
            return this.datos.map(data => {
                return {
                    "id" : data.colaborador_id ?? '',
                    "nombre_completo" : data.colaborador_nombre_completo ?? '',
                    "telefono" : data.colaborador_telefono ?? '',
                    "area" : data.colaborador_area ?? '',
                    "empresa_id" : data.empresa_id ?? ''
                };
            });
        } else {
            return []
        }
    }
}

export default EmpresaColaboradorDto;