import { createAccessToken } from "../../common/jwt.js";
import CN_UsuarioEmpresa from "../usuario_empresa/usuario_empresa.negocio.js";

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
}

export default CN_Auth