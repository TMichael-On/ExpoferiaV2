import pool from "../../database/conection-db.js";

class CD_Empresa {
  //CREATE
  async createEmpresa(data) {
    let message = "success";
    let rows = [];
    try {
      [rows] = await pool.query(
        "SELECT * FROM expo_empresa WHERE empresa_numero_ruc  = ? or empresa_correo = ?",
        [data.ruc, data.correo]
      );
      if (rows.length > 0) {
        message = "Correo o número ruc ya existente";
      } else {
        [rows] = await pool.query(
          "INSERT INTO expo_empresa (empresa_nombre , empresa_numero_ruc, empresa_rubro, empresa_direccion, empresa_telefono, empresa_correo, empresa_descripcion, empresa_historia, empresa_usuario_id, empresa_imagen, empresa_video) VALUES (?,?,?,?,?,?,?,?,?,?,?)",
          [
            data.nombre,
            data.numero_ruc,
            data.rubro,
            data.direccion,
            data.telefono,
            data.correo,
            data.descripcion,
            data.historia,
            data.usuario_id,
            data.image,
            data.video,
          ]
        );
      }
    } catch (error) {
      message = "Algo salió mal en CD: " + error.message;
    }
    return { message: message, rows: rows };
  }

  //READ GENERAL
  async getEmpresas() {
    let message = "success";
    let rows = [];
    try {
      [rows] = await pool.query(
        "SELECT * FROM expo_empresa ORDER BY empresa_id"
      );
    } catch (error) {
      message = "Algo salió mal en CD: " + error.message;
    }
    return { message: message, rows: rows };
  }

  //READ GENERAL ID
  async getEmpresasId(id) {
    let message = "success";
    let rows = [];
    try {
      [rows] = await pool.query(
        "SELECT * FROM expo_empresa WHERE empresa_usuario_id = ? ORDER BY empresa_id",
        [id]
      );
    } catch (error) {
      message = "Algo salió mal en CD: " + error.message;
    }
    return { message: message, rows: rows };
  }

  //READ ID
  async getEmpresa(id) {
    let message = "success";
    let rows = [];
    try {
      [rows] = await pool.query(
        "SELECT * FROM expo_empresa WHERE empresa_id = ?",
        [id]
      );
      if (rows.length == 0) {
        message = "Empresa no encontrada";
      }
    } catch (error) {
      message = "Algo salió mal en CD: " + error.message;
    }
    return { message: message, rows: rows };
  }

  //UPDATE
  async updateEmpresa(id, data) {
    let sql = "UPDATE expo_empresa SET ";
    let message = "success";
    let rows = [];
    const params = [];
    const updates = [];
    if (data.nombre !== undefined) {
      updates.push("empresa_nombre = ?");
      params.push(data.nombre);
    }
    if (data.numero_ruc !== undefined) {
      updates.push("empresa_numero_ruc = ?");
      params.push(data.numero_ruc);
    }
    if (data.rubro !== undefined) {
      updates.push("empresa_rubro = ?");
      params.push(data.rubro);
    }
    if (data.direccion !== undefined) {
      updates.push("empresa_direccion = ?");
      params.push(data.direccion);
    }
    if (data.telefono !== undefined) {
      updates.push("empresa_telefono = ?");
      params.push(data.telefono);
    }
    if (data.correo !== undefined) {
      updates.push("empresa_correo = ?");
      params.push(data.correo);
    }
    if (data.descripcion !== undefined) {
      updates.push("empresa_descripcion = ?");
      params.push(data.descripcion);
    }
    if (data.historia !== undefined) {
      updates.push("empresa_historia = ?");
      params.push(data.historia);
    }
    if (data.usuario_id !== undefined) {
      updates.push("empresa_usuario_id = ?");
      params.push(data.usuario_id);
    }
    if (updates.length === 0) {
      return { message: "Sin datos para actualizar", rows: [] };
    } else {
      sql += updates.join(", ");
      sql += " WHERE empresa_id = ?";
      params.push(id);
      try {
        [rows] = await pool.query(sql, params);
        if (rows.affectedRows === 0) {
          message = "Empresa no encontrada";
        }
      } catch (error) {
        message = "Algo salió mal en CD: " + error.message;
      }
      return { message: message, rows: rows };
    }
  }

  //DELETE
  async deleteEmpresa(id) {
    let message = "success";
    let rows = [];
    try {
      [rows] = await pool.query(
        "DELETE FROM expo_empresa WHERE empresa_id = (?)",
        [id]
      );
      if (rows.affectedRows == 0) {
        message = "Empresa no encontrada";
      }
    } catch (error) {
      message = "Algo salió mal en CD: " + error.message;
    }
    return { message: message, rows: rows };
  }
}

export default CD_Empresa;
