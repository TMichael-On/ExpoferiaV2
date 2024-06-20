export class EmpresaColaboradorDto {

    constructor(datos) {
        this.datos = datos
    }

    getData() {
        if (this.datos.length > 0) {
            return this.datos.map(data => {
                return {
                    "id" : data.agenda_id ?? '',
                    "asunto" : data.agenda_asunto ?? '',
                    "motivo" : data.agenda_motivo ?? '',
                };
            });
        } else {
            return []
        }
    }
}

export default EmpresaColaboradorDto;