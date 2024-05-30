import CD_UsuarioEmpresa from "./usuario_empresa.datos.js";
import UsuarioEmpresaDto from "./usuario_empresa.dto.js" 

var objCapaDato = new CD_UsuarioEmpresa();

class CN_UsuarioEmpresa {

    //CREATE
    async createUsuarioEmpresa(data) {    
        try {
            return await objCapaDato.createUsuarioEmpresa(data);
        } catch (error) {
            return { message: "Algo salió mal en CN.", error: error.message };
        }
    } 

    //READ GENERAL
    async getUsuarioEmpresas() {
        try {
            const result = await objCapaDato.getUsuarioEmpresas(); 
            var objDto = new UsuarioEmpresaDto(result.rows);
            result.rows = objDto.getData()
            return result
        } catch (error) {
            return { message: "Algo salió mal en CN.", error: error.message };
        }
    }

    //READ ID
    async getUsuarioEmpresa(id) {
        try {
            const result = await objCapaDato.getUsuarioEmpresa(id); 
            var objDto = new UsuarioEmpresaDto(result.rows);
            result.rows = objDto.getData()
            return result
        } catch (error) {
            return { message: "Algo salió mal en CN.", error: error.message };
        }
    }

    //READ ID
    async getUsuarioEmpresaCorreo(correo) {
        try {
            const result = await objCapaDato.getUsuarioEmpresaCorreo(correo); 
            // var objDto = new UsuarioEmpresaDto(result.rows);
            // result.rows = objDto.getData()
            return result
        } catch (error) {
            return { message: "Algo salió mal en CN.", error: error.message };
        }
    }

    //UPDATE 
    async updateUsuarioEmpresa(id, data) {
        try {
            return await objCapaDato.updateUsuarioEmpresa(id, data);
        } catch (error) {
            return { message: "Algo salió mal en CN.", error: error.message };
        }
    }

    //DELETE 
    async deleteUsuarioEmpresa(id) {
        try {
            return await objCapaDato.deleteUsuarioEmpresa(id);
        } catch (error) {
            return { message: "Algo salió mal en CN.", error: error.message };
        }
    }
}

export default CN_UsuarioEmpresa;