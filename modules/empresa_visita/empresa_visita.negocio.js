import CD_EmpresaVisita from "./empresa_visita.datos.js";
import EmpresaVisitaDto from "./empresa_visita.dto.js";
import helpers from "../helpers.js";

const objCapaDato = new CD_EmpresaVisita();
const objHelpers = new helpers();

class CN_EmpresaVisita {
  //CREATE
  async createEmpresaVisita(req) {
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
      const result = await objCapaDato.createEmpresaVisita(data);
      if (result.message != "success") {
        return result
      }
    } catch (error) {
      message = "Algo salió mal en CN: " + error.message;
    }
    return { message };    
  }

  //READ GENERAL
  async getEmpresaVisitas() {
    const result = await objCapaDato.getEmpresaVisitas();
    var objDto = new EmpresaVisitaDto(result.rows);
    result.rows = objDto.getData();
    return result;
  }

  //READ GENERAL ID
  async getEmpresaVisitasId(id) {
    const result = await objCapaDato.getEmpresaVisitaesId(id);
    var objDto = new EmpresaVisitaDto(result.rows);
    result.rows = objDto.getData();
    return result;
  }

  //READ ID
  async getEmpresaVisita(id) {
    const result = await objCapaDato.getEmpresaVisita(id);
    var objDto = new EmpresaVisitaDto(result.rows);
    result.rows = objDto.getData();
    return result;
  }

  //DELETE
  async deleteEmpresaVisita(id) {
    let message = "success";
    try {
      const result = await objCapaDato.deleteEmpresaVisita(id);
      if (result.message != "success") {
        return result
      }
    } catch (error) {
      message = "Algo salió mal en CN: " + error.message;
    }
    return { message };
  }
}

export default CN_EmpresaVisita;
