import { createAccessToken } from "../../common/jwt.js";
import CN_UsuarioEmpresa from "../usuario_empresa/usuario_empresa.negocio.js";
import bcrypt from "bcryptjs";

const objUsuarioEmpresa = new CN_UsuarioEmpresa();

class CN_Auth {

    async register(data) {
        try {
            const result = await objUsuarioEmpresa.createUsuarioEmpresa(data)

            if (result.message != 'success') {
                return result
            }
            // create access token
            const id_usuario = result.rows.insertId
            const token = await createAccessToken({
                id: id_usuario,
            });
            return { message: 'success', token };
        } catch (error) {
            return { message: "Algo salió mal en CN.", error: error.message };
        }
    }

    async login(data) {
        try {
            const { correo, contrasena } = data;

            const result = await objUsuarioEmpresa.getUsuarioEmpresaCorreo(correo)
            if (result.message != 'success') {
                return result
            }

            const isMatch = await bcrypt.compare(contrasena, result.rows.usuario_contrasena);
            if (!isMatch) {
                return { message: 'La contraseña es incorrecta' };
            }

            // create access token
            const id_usuario = userFound.rows.usuario_id
            const token = await createAccessToken({
                id: id_usuario,
            });
            return { message: 'success', token };
        } catch (error) {
            return { message: "Algo salió mal en CN.", error: error.message };
        }
    }
}

export default CN_Auth