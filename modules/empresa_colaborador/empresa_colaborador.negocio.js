import CD_EmpresaColaborador from "./empresa_colaborador.datos.js";

var objCapaDato = new CD_EmpresaColaborador();

class CN_EmpresaColaborador {

    //CREATE
    async createEmpresaColaborador(data) {        
        return await objCapaDato.createEmpresaColaborador(data);
    }

    //READ GENERAL
    async getEmpresaColaboradores() {        
        return await objCapaDato.getEmpresaColaboradores();
    }

    //READ ID
    async getEmpresaColaborador(id) {        
        return await objCapaDato.getEmpresaColaborador(id);
    }

    //UPDATE 
    async updateEmpresaColaborador(id,data) {
        return await objCapaDato.updateEmpresaColaborador(id,data);
    }

    //DELETE 
    async deleteEmpresaColaborador(id) {
        return await objCapaDato.deleteEmpresaColaborador(id);
    }
}

export default CN_EmpresaColaborador;