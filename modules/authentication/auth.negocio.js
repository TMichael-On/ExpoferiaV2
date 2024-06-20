import { createAccessToken } from "../../common/jwt.js";
import CN_UsuarioEmpresa from "../usuario_empresa/usuario_empresa.negocio.js";
import CN_Empresa from "../empresa/empresa.negocio.js";
import bcrypt from "bcryptjs";

const objUsuarioEmpresa = new CN_UsuarioEmpresa();
const objEmpresa = new CN_Empresa();

class CN_Auth {

    async register(data) {
        try {
            const result = await objUsuarioEmpresa.createUsuarioEmpresa(data)

            if (result.message != 'success') {
                return result
            }
            // create access token
            const id_usuario = result.rows.insertId
            const data_empresa = {
                nombre: 'default',
                numero_ruc: 'default',
                rubro: 'default',
                direccion: 'default',
                telefono: 'default',
                correo: 'default',
                descripcion: 'default',
                historia: 'default',
                image: 'default.png',
                imagen_presentacion: 'default.png',
                imagen_historia: 'default.png',
                video: 'default',
                usuario_id: id_usuario,
            }
            const empresa = await objEmpresa.newEmpresa(data_empresa)
            const id_empresa = empresa.rows.insertId
            const token = await createAccessToken({
                id_usuario,
                id_empresa
            });
            return { message: 'success', token };
        } catch (error) {
            return { message: "Algo salió mal en CN.", error: error.message };
        }
    }

    async login(data) {
        try {
            const { correo, contrasena } = data;

            let errors = [];
            if (!data.correo) {
                errors.push("El correo es requerido");
            }
            if (!data.contrasena) {
                errors.push("La contraseña es requerida");
            }
            if (errors.length > 0) {
                return { message: "Failed", error: "Ingrese sus credenciales", rows: [] }
            }

            const result = await objUsuarioEmpresa.getUsuarioEmpresaCorreo(correo)
            if (result.message != 'success') {
                return result
            }

            const isMatch = await bcrypt.compare(contrasena, result.rows.usuario_contrasena);
            if (!isMatch) {
                return { message: 'La contraseña es incorrecta' };
            }

            // create access token
            const id_usuario = result.rows.usuario_id
            const empresa = await objEmpresa.getEmpresasId(id_usuario)
            const id_empresa = empresa.rows[0].id
            const token = await createAccessToken({
                id_usuario,
                id_empresa
            });
            return { message: 'success', token };
        } catch (error) {
            return { message: "Algo salió mal en CN.", error: error.message };
        }
    }
}

export default CN_Auth