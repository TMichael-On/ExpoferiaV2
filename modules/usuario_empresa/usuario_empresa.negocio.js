import bcrypt from "bcryptjs";
import CD_UsuarioEmpresa from "./usuario_empresa.datos.js";
import UsuarioEmpresaDto from "./usuario_empresa.dto.js" 

var objCapaDato = new CD_UsuarioEmpresa();

class CN_UsuarioEmpresa {

    //CREATE
    async createUsuarioEmpresa(data) {    
        let errors = [];
        if (!data.nombre) {
          errors.push("El nombre es requerido");
        }
        if (!data.apellido) {
          errors.push("El apellido es requerido");
        }
        if (!data.correo) {
          errors.push("El correo es requerido");
        }
        // if (!data.telefono) {
        //   errors.push("El teléfono es requerido");
        // }
        if (!data.contrasena) {
          errors.push("La contraseña es requerida");
        }
        if (errors.length > 0) {
          return { message: "Datos requeridos", rows: [] }
        }
        try {
            // Cifrar contraseña
            const passwordHash = await bcrypt.hash(data.contrasena, 10)
            data.contrasena = passwordHash
            return await objCapaDato.createUsuarioEmpresa(data)
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

    //READ CORREO
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