import CD_Empresa from "./empresa.datos.js";
import EmpresaDto from "./empresa.dto.js";

var objCapaDato = new CD_Empresa();
// var objDto = new EmpresaDto();

class CN_Empresa {
  //CREATE
  async createEmpresa(data) {
    return await objCapaDato.createEmpresa(data);
  }

  //READ GENERAL
  async getEmpresas() {
    const result = await objCapaDato.getEmpresas();
    var objDto = new EmpresaDto(result.rows);
    result.rows = objDto.getData();
    return result;
  }

  //READ GENERAL ID
  async getEmpresasId(id) {
    const result = await objCapaDato.getEmpresasId(id);
    var objDto = new EmpresaDto(result.rows);
    result.rows = objDto.getData();
    return result;
  }

  //READ ID
  async getEmpresa(id) {
    const result = await objCapaDato.getEmpresa(id);
    var objDto = new EmpresaDto(result.rows);
    result.rows = objDto.getData();
    return result;
  }

  //UPDATE
  async updateEmpresa(id, data) {
    return await objCapaDato.updateEmpresa(id, data);
  }

  //DELETE
  async deleteEmpresa(id) {
    return await objCapaDato.deleteEmpresa(id);
  }
}

export default CN_Empresa;
