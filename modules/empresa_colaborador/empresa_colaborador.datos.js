import pool from "../../database/conection-db.js";

class CD_EmpresaColaborador {
  
  //CREATE
  async createEmpresaColaborador(data) {
    let message = "";
    let rows;
    try {
      const [result] = await pool.query(
        "INSERT INTO expo_empresa_colaborador (colaborador_nombre_completo , colaborador_telefono, colaborador_area, empresa_id) VALUES (?,?,?,?)",
        [
          data.nombre_completo ,
          data.telefono,
          data.area,
          data.empresa_id
        ]
      );
      rows = result;
      message = "success";      
    } catch (error) {
      message = "Algo salió mal en CD: "+error.message;
      rows = [];
    }
    return { message, rows };
  }
  
  //READ GENERAL
  async getEmpresaColaboradores() {
    let message = "";
    let rows;
    try {
      [rows] = await pool.query("SELECT * FROM expo_empresa_colaborador");
      message = "success";
    } catch (error) {
      message = "Algo salió mal en CD: "+error.message;
      rows = [];
    }
    return { message: message, rows: rows };
  }
  
  //READ ID
  async getEmpresaColaborador(id) {
    let message = "";
    let row;
    try {
      const [results] = await pool.query(
        "SELECT * FROM expo_empresa_colaborador WHERE colaborador_id = ?",
        [id]
      );
      row = results[0];
      if (row) {
        message = "success";
      } else {
        message = "Colaborador no encontrado";
        row = {};
      }
    } catch (error) {
      message = "Algo salió mal en CD: "+error.message;
      row = {};
    }
    return { message, row };
  }
  
  //UPDATE
  async updateEmpresaColaborador(id, data) {
    let sql = "UPDATE expo_empresa_colaborador SET ";
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
    if (data.empresa_id !== undefined) {
      updates.push("empresa_id = ?");
      params.push(data.empresa_id);
    }
    if (updates.length === 0) {
      return {
        message: "No se proporcionaron datos para actualizar.",
        rows: {},
      };
    }

    sql += updates.join(", ");
    sql += " WHERE colaborador_id = ?";
    params.push(id);

    try {
      const [rows] = await pool.query(sql, params);
      let message = "";
      if (rows.affectedRows === 1) {
        message = "success";
      } else {
        message = "Colaborador no encontrado";
        return { message, rows: {} };
      }
      return { message, rows };
    } catch (error) {
      const message = "Algo salió mal en CD: :" + error.message;
      return { message, rows: [] };
    }
  }

  
  //DELETE
  async deleteEmpresaColaborador(id) {
    let message = "";
    let rows;
    try {
      [rows] = await pool.query(
        "DELETE FROM expo_empresa_colaborador WHERE colaborador_id = (?)",
        [id]
      );
      if (rows.affectedRows == 1) {
        message = "success";
      } else {
        message = "Colaborador no encontrado";
        rows = {};
      }
    } catch (error) {
      message = "Algo salió mal en CD: "+error.message;
      rows = [];
    }
    return { message: message, rows: rows };
  }
}

export default CD_EmpresaColaborador;
