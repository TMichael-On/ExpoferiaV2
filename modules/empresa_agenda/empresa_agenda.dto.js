export class EmpresaColaboradorDto {

    constructor(datos) {
        this.datos = datos
    }

    getData() {
        if (this.datos.length > 0) {
            return this.datos.map(data => {
                return {
                    "id" : data.agenda_id ?? '',
                    "Asunto" : data.agenda_asunto ?? '',
                    "Motivo" : data.agenda_motivo ?? '',
                    'Opciones': data.agenda_id ?? '',
                };
            });
        } else {
            return []
        }
    }
}

export default EmpresaColaboradorDto;