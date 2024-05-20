import pool from "../../database/conection-db.js";

class CD_Empresa {
  
  //CREATE
  async createEmpresa(data) {
    let message = "";
    let rows;
    try {
      const [results] = await pool.query(
        "SELECT * FROM expo_empresa WHERE empresa_numero_ruc  = ? or empresa_correo = ?",
        [data.ruc, data.correo]
      );
      rows = results[0];
      if (rows) {
        message = "Correo o número ruc ya existente";
      } else {
        const [result] = await pool.query(
          "INSERT INTO expo_empresa (empresa_nombre , empresa_numero_ruc, empresa_rubro, empresa_direccion, empresa_telefono, empresa_correo, empresa_descripcion, empresa_historia, empresa_usuario_id) VALUES (?,?,?,?,?,?,?,?,?)",
          [
            data.nombre ,
            data.numero_ruc,
            data.rubro,
            data.direccion,
            data.telefono,
            data.correo,
            data.descripcion,
            data.historia,
            data.usuario_id
          ]
        );
        rows = result;
        message = "success";
      }
    } catch (error) {
      message = "Algo salió mal en CD: "+error.message;
      rows = [];
    }
    return { message, rows };
  }
  
  //READ GENERAL
  async getEmpresas() {
    let message = "";
    let rows;
    try {
      [rows] = await pool.query("SELECT * FROM expo_empresa");
      message = "success";
    } catch (error) {
      message = "Algo salió mal en CD: "+error.message;
      rows = [];
    }
    return { message: message, rows: rows };
  }
  
  //READ ID
  async getEmpresa(id) {
    let message = "";
    let row;
    try {
      const [results] = await pool.query(
        "SELECT * FROM expo_empresa WHERE empresa_id = ?",
        [id]
      );
      row = results[0];
      if (row) {
        message = "success";
      } else {
        message = "Empresa no encontrada";
        row = {};
      }
    } catch (error) {
      message = "Algo salió mal en CD: "+error.message;
      row = {};
    }
    return { message, row };
  }
  
  //UPDATE
  async updateEmpresa(id, data) {
    let sql = "UPDATE expo_empresa SET ";
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
      return {
        message: "No se proporcionaron datos para actualizar.",
        rows: {},
      };
    }

    sql += updates.join(", ");
    sql += " WHERE empresa_id = ?";
    params.push(id);

    try {
      const [rows] = await pool.query(sql, params);
      let message = "";
      if (rows.affectedRows === 1) {
        message = "success";
      } else {
        message = "Empresa no encontrada";
        return { message, rows: {} };
      }
      return { message, rows };
    } catch (error) {
      const message = "Algo salió mal en CD: " + error.message;
      return { message, rows: [] };
    }
  }

  
  //DELETE
  async deleteEmpresa(id) {
    let message = "";
    let rows;
    try {
      [rows] = await pool.query(
        "DELETE FROM expo_empresa WHERE empresa_id = (?)",
        [id]
      );
      if (rows.affectedRows == 1) {
        message = "success";
      } else {
        message = "Empresa no encontrada";
        rows = {};
      }
    } catch (error) {
      message = "Algo salió mal en CD: "+error.message;
      rows = [];
    }
    return { message: message, rows: rows };
  }
}

export default CD_Empresa;
