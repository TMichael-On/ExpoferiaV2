import pool from "../../database/conection-db.js";

class CD_UsuarioEmpresa {
  //CREATE
  async createUsuarioEmpresa(data) {
    let message = "success";
    let rows = [];
    try {
      [rows] = await pool.query(
        "SELECT * FROM expo_usuario_empresa WHERE usuario_correo = ?",
        [data.correo]
      );

      if (rows.length > 0) {
        message = "Correo " + data.correo + " ya existente";
      } else {
        [rows] = await pool.query(
          "INSERT INTO expo_usuario_empresa (usuario_nombre, usuario_apellido, usuario_correo, usuario_telefono, usuario_contrasena, usuario_fecha_registro) VALUES (?,?,?,?,?,current_timestamp())",
          [
            data.nombre,
            data.apellido,
            data.correo,
            data.telefono,
            data.contrasena,
          ]
        );
      }
    } catch (error) {
      message = "Algo salió mal en CD: " + error.message;
    }
    return { message: message, rows: rows };
  }

  //READ GENERAL
  async getUsuarioEmpresas() {
    let message = "success";
    let rows = [];
    try {
      [rows] = await pool.query("SELECT * FROM expo_usuario_empresa");
    } catch (error) {
      message = "Algo salió mal en CD: " + error.message;
    }
    return { message: message, rows: rows };
  }

  //READ ID
  async getUsuarioEmpresa(id) {
    let message = "success";
    let rows = [];
    try {
      [rows] = await pool.query(
        "SELECT * FROM expo_usuario_empresa WHERE usuario_id = (?)",
        [id]
      );
      if (rows.length === 0) {
        message = "Usuario no encontrado";
      }
    } catch (error) {
      message = "Algo salió mal en CD: " + error.message;
    }
    return { message: message, rows: rows };
  }

  //UPDATE
  async updateUsuarioEmpresa(id, data) {
    let sql = "UPDATE expo_usuario_empresa SET ";
    let message = "success";
    let rows = [];
    const params = [];
    const updates = [];

    if (data.nombre !== undefined) {
      updates.push("usuario_nombre = ?");
      params.push(data.nombre);
    }
    if (data.apellido !== undefined) {
      updates.push("usuario_apellido = ?");
      params.push(data.apellido);
    }
    if (data.correo !== undefined) {
      updates.push("usuario_correo = ?");
      params.push(data.correo);
    }
    if (data.telefono !== undefined) {
      updates.push("usuario_telefono = ?");
      params.push(data.telefono);
    }
    if (data.contrasena !== undefined) {
      updates.push("usuario_contrasena = ?");
      params.push(data.contrasena);
    }
    if (data.correo !== undefined) {
      updates.push("usuario_correo = ?");
      params.push(data.correo);
    }
    sql += updates.join(", ");
    sql += " WHERE usuario_id = ?";
    params.push(id);
    try {
      [rows] = await pool.query(sql, params);
      if (rows.affectedRows === 0) {
        message = "Usuario no encontrado";
      }
    } catch (error) {
      message = "Algo salió mal en CD: :+error.message " + error.message;
    }
    return { message: message, rows: rows };
  }

  //DELETE
  async deleteUsuarioEmpresa(id) {
    let message = "success";
    let rows = [];
    try {
      [rows] = await pool.query(
        "DELETE FROM expo_usuario_empresa WHERE usuario_id = (?)",
        [id]
      );
      if (rows.affectedRows == 0) {
        message = "Usuario no encontrado";
      }
    } catch (error) {
      message = "Algo salió mal en CD: " + error.message;
      rows = [];
    }
    return { message: message, rows: rows };
  }
}

export default CD_UsuarioEmpresa;
