import pool from "../../database/conection-db.js";

class CD_EmpresaAgenda {
  //CREATE
  async createEmpresaAgenda(data) {
    let message = "success";
    let rows = [];
    try {
      [rows] = await pool.query(
        "INSERT INTO expo_empresa_agenda (agenda_asunto , agenda_motivo, empresa_id, usuario_id, agenda_fecha_registro) VALUES (?,?,?,?,current_time)",
        [data.asunto, data.motivo, data.empresa_id, data.usuario_id]
      );
    } catch (error) {
      message = "Algo salió mal en CD: " + error.message;
    }
    return { message: message, rows: rows };
  }

  //READ GENERAL
  async getEmpresaAgendaes() {
    let message = "success";
    let rows = [];
    try {
      [rows] = await pool.query(
        "SELECT * FROM expo_empresa_agenda ag INNER JOIN live_usuario us on ag.usuario_id = us.usuario_id  ORDER BY ag.agenda_id "
      );
    } catch (error) {
      message = "Algo salió mal en CD: " + error.message;
    }
    return { message: message, rows: rows };
  }

  //READ GENERAL ID
  async getEmpresaAgendaesId(id) {
    let message = "success";
    let rows = [];
    try {
      [rows] = await pool.query(
        "SELECT * FROM expo_empresa_agenda ag INNER JOIN live_usuario us on ag.usuario_id = us.usuario_id  WHERE ag.empresa_id = ? ORDER BY ag.agenda_id",
        [id]
      );
    } catch (error) {
      message = "Algo salió mal en CD: " + error.message;
    }
    return { message: message, rows: rows };
  }

  //READ ID
  async getEmpresaAgenda(id) {
    let message = "success";
    let rows = [];
    try {
      [rows] = await pool.query(
        "SELECT * FROM expo_empresa_agenda ag INNER JOIN live_usuario us on ag.usuario_id = us.usuario_id  WHERE ag.empresa_id = ? ORDER BY ag.agenda_id",
        [id]
      );
      if (rows.length == 0) {
        message = "agenda no encontrado";
      }
    } catch (error) {
      message = "Algo salió mal en CD: " + error.message;
    }
    return { message: message, rows: rows };
  }

  //DELETE
  async deleteEmpresaAgenda(id) {
    let message = "success";
    let rows = [];
    try {
      [rows] = await pool.query(
        "DELETE FROM expo_empresa_agenda WHERE agenda_id = (?)",
        [id]
      );
      if (rows.affectedRows == 0) {
        message = "agenda no encontrado";
      }
    } catch (error) {
      message = "Algo salió mal en CD: " + error.message;
    }
    return { message: message, rows: rows };
  }
}

export default CD_EmpresaAgenda;
