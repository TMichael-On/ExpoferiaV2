import pool from "../../database/conection-db.js";

class CD_UsuarioEmpresa {
    //CREATE
    async createUsuarioEmpresa(data) {
        var message = "";
        var rows;
        try {
            [rows] = await pool.query("INSERT INTO expo_usuario_empresa (usuario_nombre, usuario_apellido, usuario_correo, usuario_telefono, usuario_contrasena, usuario_fecha_registro) VALUES (?,?,?,?,?,current_timestamp())",[data.nombre, data.apellidos, data.correo, data.telefono, data.contrasena]);
        } catch (error) {
            message = "Algo salió mal en CD";
            rows = [];
        }
        return { message:message, rows:rows };
    }
    //READ GENERAL
    async getUsuarioEmpresas() {
        var message = "";
        var rows;
        try {
            [rows] = await pool.query("SELECT * FROM expo_usuario_empresa");
        } catch (error) {
            message = "Algo salió mal en CD" + error;
            rows = [];
        }
        return { message:message, rows:rows };
    }
    //READ ID
    async getUsuarioEmpresa(data) {
        var message = "";
        var rows;
        try {
            [rows] = await pool.query("SELECT * FROM expo_usuario_empresa WHERE usuario_id = (?)",[data.id]);
        } catch (error) {
            message = "Algo salió mal en CD";
            rows = [];
        }
        return { message:message, rows:rows };
    }
    //UPDATE
    async updateUsuarioEmpresa(data) {
        var message = "";
        var rows;
        try {
            [rows] = await pool.query("UPDATE expo_usuario_empresa SET usuario_nombre = (?), usuario_apellido = (?), usuario_correo = (?), usuario_telefono = (?), usuario_contrasena = (?), usuario_fecha_registro = (?) WHERE usuario_id = (?)",[data.nombre, data.apellidos, data.correo, data.telefono, data.contrasena, data.fecha, data.id]);
        } catch (error) {
            message = "Algo salió mal en CD";
            rows = [];
        }
        return { message:message, rows:rows };
    }
    //DELETE
    async deleteUsuarioEmpresa(data) {
        var message = "";
        var rows;
        try {
            [rows] = await pool.query("DELETE FROM expo_usuario_empresa WHERE usuario_id = (?)",[data.id]);
        } catch (error) {
            message = "Algo salió mal en CD";
            rows = [];
        }
        return { message:message, rows:rows };
    }
}

export default CD_UsuarioEmpresa;
