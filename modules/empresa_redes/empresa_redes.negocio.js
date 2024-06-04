import CD_EmpresaRedes from "./empresa_redes.datos.js";
import EmpresaRedesDto from "./empresa_redes.dto.js";

var objCapaDato = new CD_EmpresaRedes();

class CN_EmpresaRedes {
  //CREATE
  async createEmpresaRedes(data) {
    return await objCapaDato.createEmpresaRedes(data);
  }

  //READ GENERAL
  async getEmpresasRedes() {
    const result = await objCapaDato.getEmpresasRedes();
    var objDto = new EmpresaRedesDto(result.rows);
    result.rows = objDto.getData();
    return result;
  }

  //READ GENERAL ID
  async getEmpresasRedesId(id) {
    const result = await objCapaDato.getEmpresasRedesId(id);
    var objDto = new EmpresaRedesDto(result.rows);
    result.rows = objDto.getData();
    return result;
  }

  //READ ID
  async getEmpresaRedesId(id) {
    const result = await objCapaDato.getEmpresaRedes(id);
    var objDto = new EmpresaRedesDto(result.rows);
    result.rows = objDto.getData();
    return result;
  }

  //UPDATE
  async updateEmpresaRedes(id, data) {
    return await objCapaDato.updateEmpresaRedes(id, data);
  }

  //DELETE
  async deleteEmpresaRedes(id) {
    return await objCapaDato.deleteEmpresaRedes(id);
  }
}

export default CN_EmpresaRedes;
