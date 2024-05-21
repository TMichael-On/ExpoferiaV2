import CD_UsuarioEmpresa from "./usuario_empresa.datos.js";
import UsuarioEmpresaDto from "./usuario_empresa.dto.js" 

var objCapaDato = new CD_UsuarioEmpresa();

class CN_UsuarioEmpresa {

    //CREATE
    async createUsuarioEmpresa(data) {
        return await objCapaDato.createUsuarioEmpresa(data);
    }

    //READ GENERAL
    async getUsuarioEmpresas() {
        const result = await objCapaDato.getUsuarioEmpresas(); 
        var objDto = new UsuarioEmpresaDto(result.rows);
        result.rows = objDto.getData()
        return result
    }

    //READ ID
    async getUsuarioEmpresa(id) {
        const result = await objCapaDato.getUsuarioEmpresa(id); 
        var objDto = new UsuarioEmpresaDto(result.rows);
        result.rows = objDto.getData()
        return result
    }

    //UPDATE 
    async updateUsuarioEmpresa(id, data) {
        return await objCapaDato.updateUsuarioEmpresa(id, data);
    }

    //DELETE 
    async deleteUsuarioEmpresa(id) {
        return await objCapaDato.deleteUsuarioEmpresa(id);
    }
}

export default CN_UsuarioEmpresa;