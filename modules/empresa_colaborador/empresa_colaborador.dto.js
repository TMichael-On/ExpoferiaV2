export class EmpresaColaboradorDto {

    constructor(datos) {
        this.datos = datos
    }

    getData() {
        if (this.datos.length > 0) {
            return this.datos.map(data => {
                return {
                    "id" : data.colaborador_id ?? '',
                    "Nombre" : data.colaborador_nombre_completo ?? '',
                    "Teléfono" : data.colaborador_telefono ?? '',
                    "Área" : data.colaborador_area ?? '',
                    'Opciones': data.colaborador_id ?? '',
                    'Empresa': data.empresa_id ?? '',
                };
            });
        } else {
            return []
        }
    }
}

export default EmpresaColaboradorDto;