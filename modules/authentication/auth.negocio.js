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
        const { email, password } = data;
        const userFound = await User.findOne({ email });

        if (!userFound)
            return res.status(400).json({
                message: ["The email does not exist"],
            });

        const isMatch = await bcrypt.compare(password, userFound.password);
        if (!isMatch) {
            return res.status(400).json({
                message: ["The password is incorrect"],
            });
        }

        // create access token
        const id_usuario = userFound
        const token = await createAccessToken({
            id: id_usuario,
        });
    }
}

export default CN_Auth