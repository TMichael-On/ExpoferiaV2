import pool from "../../database/conection-db.js";

class CD_EmpresaColaborador {
  //CREATE
  async createEmpresaColaborador(data) {
    let message = "success";
    let rows = [];
    try {
      [rows] = await pool.query(
        "INSERT INTO expo_empresa_colaborador (colaborador_nombre_completo , colaborador_telefono, colaborador_area, colaborador_imagen, empresa_id) VALUES (?,?,?,?,?)",
        [data.nombre_completo, data.telefono, data.area, data.image, data.empresa_id]
      );
    } catch (error) {
      message = "Algo salió mal en CD: " + error.message;
    }
    return { message: message, rows: rows };
  }

  //READ GENERAL
  async getEmpresaColaboradores() {
    let message = "success";
    let rows = [];
    try {
      [rows] = await pool.query(
        "SELECT * FROM expo_empresa_colaborador ORDER BY colaborador_id"
      );
    } catch (error) {
      message = "Algo salió mal en CD: " + error.message;
    }
    return { message: message, rows: rows };
  }

  //READ GENERAL ID
  async getEmpresaColaboradoresId(id) {
    let message = "success";
    let rows = [];
    try {
      [rows] = await pool.query(
        "SELECT * FROM expo_empresa_colaborador WHERE empresa_id = ? ORDER BY colaborador_id",
        [id]
      );
    } catch (error) {
      message = "Algo salió mal en CD: " + error.message;
    }
    return { message: message, rows: rows };
  }

  //READ ID
  async getEmpresaColaborador(id) {
    let message = "success";
    let rows = [];
    try {
      [rows] = await pool.query(
        "SELECT * FROM expo_empresa_colaborador WHERE colaborador_id = ?",
        [id]
      );
      if (rows.length == 0) {
        message = "Colaborador no encontrado";
      }
    } catch (error) {
      message = "Algo salió mal en CD: " + error.message;
    }
    return { message: message, rows: rows };
  }

  //UPDATE
  async updateEmpresaColaborador(id, data) {
    let sql = "UPDATE expo_empresa_colaborador SET ";
    let message = "success";
    let rows = [];
    const params = [];
    const updates = [];
    if (data.nombre_completo !== undefined) {
      updates.push("colaborador_nombre_completo = ?");
      params.push(data.nombre_completo);
    }
    if (data.telefono !== undefined) {
      updates.push("colaborador_telefono = ?");
      params.push(data.telefono);
    }
    if (data.area !== undefined) {
      updates.push("colaborador_area = ?");
      params.push(data.area);
    }
    if (data.image !== undefined) {
      updates.push("colaborador_imagen = ?");
      params.push(data.image);
    }    
    // if (data.empresa_id !== undefined) {
    //   updates.push("empresa_id = ?");
    //   params.push(data.empresa_id);
    // }
    if (updates.length === 0) {
      return { message: "Sin datos para actualizar", rows: [] };
    } else {
      sql += updates.join(", ");
      sql += " WHERE colaborador_id = ?";
      params.push(id);

      try {
        [rows] = await pool.query(sql, params);
        if (rows.affectedRows === 0) {
          message = "Colaborador no encontrado";
        }
      } catch (error) {
        message = "Algo salió mal en CD: :" + error.message;
      }
      return { message: message, rows: rows };
    }
  }

  //DELETE
  async deleteEmpresaColaborador(id) {
    let message = "success";
    let rows = [];
    try {
      [rows] = await pool.query(
        "DELETE FROM expo_empresa_colaborador WHERE colaborador_id = (?)",
        [id]
      );
      if (rows.affectedRows == 0) {
        message = "Colaborador no encontrado";
      }
    } catch (error) {
      message = "Algo salió mal en CD: " + error.message;
    }
    return { message: message, rows: rows };
  }
}

export default CD_EmpresaColaborador;
