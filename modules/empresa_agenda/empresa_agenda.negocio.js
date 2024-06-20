import CD_EmpresaAgenda from "./empresa_agenda.datos.js";
import EmpresaAgendaDto from "./empresa_agenda.dto.js";
import helpers from "../helpers.js";

const objCapaDato = new CD_EmpresaAgenda();
const objHelpers = new helpers();

class CN_EmpresaAgenda {
  //CREATE
  async createEmpresaAgenda(req) {
    var data = req.body;
    let message = "success";
    // data.empresa_id = req.user.id_empresa
    // if (typeof data !== 'object' || data === null || Array.isArray(data)) {
    //   return { message };
    // }  
    if (Object.values(data).some(value => value === '')) {
      return { message: 'Datos requeridos' }
    }
    try {
      const result = await objCapaDato.createEmpresaAgenda(data);
      if (result.message != "success") {
        return result
      }
    } catch (error) {
      message = "Algo salió mal en CN: " + error.message;
    }
    return { message };    
  }

  //READ GENERAL
  async getEmpresaAgendaes() {
    const result = await objCapaDato.getEmpresaAgendaes();
    var objDto = new EmpresaAgendaDto(result.rows);
    result.rows = objDto.getData();
    return result;
  }

  //READ GENERAL ID
  async getEmpresaAgendaesId(id) {
    const result = await objCapaDato.getEmpresaAgendaesId(id);
    var objDto = new EmpresaAgendaDto(result.rows);
    result.rows = objDto.getData();
    return result;
  }

  //READ ID
  async getEmpresaAgenda(id) {
    const result = await objCapaDato.getEmpresaAgenda(id);
    var objDto = new EmpresaAgendaDto(result.rows);
    result.rows = objDto.getData();
    return result;
  }

  //DELETE
  async deleteEmpresaAgenda(id) {
    let message = "success";
    try {
      const result = await objCapaDato.deleteEmpresaAgenda(id);
      if (result.message != "success") {
        return result
      }
    } catch (error) {
      message = "Algo salió mal en CN: " + error.message;
    }
    return { message };
  }
}

export default CN_EmpresaAgenda;
