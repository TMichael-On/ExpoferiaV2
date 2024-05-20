import CD_EmpresaRedes from "./empresa_redes.datos.js";

var objCapaDato = new CD_EmpresaRedes();

class CN_EmpresaRedes {

    //CREATE
    async createEmpresaRedes(data) {        
        return await objCapaDato.createEmpresaRedes(data);
    }

    //READ GENERAL
    async getEmpresasRedes() {
        return await objCapaDato.getEmpresasRedes();
    }

    //READ ID
    async getEmpresaRedes(id) {        
        return await objCapaDato.getEmpresaRedes(id);
    }

    //UPDATE 
    async updateEmpresaRedes(id, data) {
        return await objCapaDato.updateEmpresaRedes(id, data);
    }

    //DELETE 
    async deleteEmpresaRedes(id) {
        return await objCapaDato.deleteEmpresaRedes(id);
    }
}

export default CN_EmpresaRedes;