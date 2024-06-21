import pool from "../../database/conection-db.js";

class CD_EmpresaVisita {
  //CREATE
  async createEmpresaVisita(data) {
    let message = "success";
    let rows = [];
    try {      
      [rows] = await pool.query(
        "SELECT * FROM expo_empresa_visita vi INNER JOIN live_usuario us on vi.usuario_id = us.usuario_id WHERE vi.empresa_id = ? and  us.usuario_id = ? ORDER BY vi.visita_id ",
        [data.empresa_id, data.usuario_id]
      );
      // message = "visita_exist";
      if(rows.length === 0){
        [rows] = await pool.query(
          "INSERT INTO expo_empresa_visita (empresa_id, usuario_id, visita_fecha_registro) VALUES (?,?,current_time)",
          [data.empresa_id, data.usuario_id]
        );
      } 
    } catch (error) {
      message = "Algo salió mal en CD: " + error.message;
    }
    return { message: message, rows: rows };
  }

  //READ GENERAL
  async getEmpresaVisitas() {
    let message = "success";
    let rows = [];
    try {
      [rows] = await pool.query(
        "SELECT * FROM expo_empresa_visita vi INNER JOIN live_usuario us on vi.usuario_id = us.usuario_id  ORDER BY vi.visita_id"
      );
    } catch (error) {
      message = "Algo salió mal en CD: " + error.message;
    }
    return { message: message, rows: rows };
  }

  //READ GENERAL ID
  async getEmpresaVisitasId(id) {
    let message = "success";
    let rows = [];
    try {
      [rows] = await pool.query(
        "SELECT * FROM expo_empresa_visita vi INNER JOIN live_usuario us on vi.usuario_id = us.usuario_id WHERE vi.empresa_id = ? ORDER BY vi.visita_id ",
        [id]
      );
    } catch (error) {
      message = "Algo salió mal en CD: " + error.message;
    }
    return { message: message, rows: rows };
  }

  //READ ID
  async getEmpresaVisita(id) {
    let message = "success";
    let rows = [];
    try {
      [rows] = await pool.query(
        "SELECT * FROM expo_empresa_visita vi INNER JOIN live_usuario us on vi.usuario_id = us.usuario_id WHERE vi.empresa_id = ? ORDER BY vi.visita_id ",
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
}

export default CD_EmpresaVisita;
