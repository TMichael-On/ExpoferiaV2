import pool from "../../database/conection-db.js";

class CD_EmpresaRedes {
  
  //CREATE
  async createEmpresaRedes(data) {
    let message = "success";
    let rows = [];
    try {
      [rows] = await pool.query(
        "SELECT * FROM expo_empresa_redes WHERE redes_url  = ?",
        [data.url, ]
      );
      if (rows.length > 0) {
        message = "Red "+data.nombre+" ya existente";
      } else {
        [rows] = await pool.query(
          "INSERT INTO expo_empresa_redes (redes_nombre , redes_url, empresa_id) VALUES (?,?,?)",
          [
            data.nombre ,
            data.url,
            data.empresa_id
          ]
        );
      }
    } catch (error) {
      message = "Algo salió mal en CD: "+error.message;
    }
    return { message: message, rows: rows };
  }
  
  //READ GENERAL
  async getEmpresasRedes() {
    let message = "success";
    let rows = [];
    try {
      [rows] = await pool.query("SELECT * FROM expo_empresa_redes");
    } catch (error) {
      message = "Algo salió mal en CD: "+error.message;
    }
    return { message: message, rows: rows };
  }
  
  //READ ID
  async getEmpresaRedes(id) {
    let message = "success";
    let rows = [];
    try {
      [rows] = await pool.query(
        "SELECT * FROM expo_empresa_redes WHERE redes_id = ?",
        [id]
      );
      if (rows.length == 0) {
        message = "Redes no encontradas";
      }
    } catch (error) {
      message = "Algo salió mal en CD: "+error.message;
    }
    return { message: message, rows: rows };
  }
  
  //UPDATE
  async updateEmpresaRedes(id, data) {
    let sql = "UPDATE expo_empresa_redes SET ";
    let message = "success";
    let rows = [];
    const params = [];
    const updates = [];
    if (data.nombre !== undefined) {
      updates.push("redes_nombre = ?");
      params.push(data.nombre);
    }
    if (data.url !== undefined) {
      updates.push("redes_url = ?");
      params.push(data.url);
    }
    if (data.empresa_id !== undefined) {
      updates.push("empresa_id = ?");
      params.push(data.empresa_id);
    }
    if (updates.length === 0) {
      message = "No se proporcionaron datos para actualizar.";
    }

    sql += updates.join(", ");
    sql += " WHERE redes_id = ?";
    params.push(id);

    try {
      [rows] = await pool.query(sql, params);
      if (rows.affectedRows === 0) {
        message = "Redes no encontradas";
        return { message, rows: {} };
      }
    } catch (error) {
      message = "Algo salió mal en CD: :+error.message " + error.message;
    }
    return { message: message, rows: rows };
  }

  
  //DELETE
  async deleteEmpresaRedes(id) {
    let message = "success";
    let rows = [];
    try {
      [rows] = await pool.query(
        "DELETE FROM expo_empresa_redes WHERE redes_id = (?)",
        [id]
      );
      if (rows.affectedRows == 0) {
        message = "Redes no encontradas";
      }
    } catch (error) {
      message = "Algo salió mal en CD: "+error.message;
    }
    return { message: message, rows: rows };
  }
}

export default CD_EmpresaRedes;
