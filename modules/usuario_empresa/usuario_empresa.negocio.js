import CD_UsuarioEmpresa from "./usuario_empresa.data.js";

var objCapaDato = new CD_UsuarioEmpresa();

class CN_UsuarioEmpresa {

    //CREATE
    async createUsuarioEmpresa() {
        return await objCapaDato.createUsuarioEmpresa();
    }

    //READ GENERAL
    async getUsuarioEmpresas() {
        return await objCapaDato.getUsuarioEmpresas();
    }

    //READ ID
    async getUsuarioEmpresa() {
        return await objCapaDato.getUsuarioEmpresa();
    }

    //UPDATE 
    async updateUsuarioEmpresa() {
        return await objCapaDato.updateUsuarioEmpresa();
    }

    //DELETE 
    async deleteUsuarioEmpresa() {
        return await objCapaDato.deleteUsuarioEmpresa();
    }
}

export default CN_UsuarioEmpresa;