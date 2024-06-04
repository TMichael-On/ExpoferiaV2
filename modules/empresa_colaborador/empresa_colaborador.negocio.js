import CD_EmpresaColaborador from "./empresa_colaborador.datos.js";
import EmpresaColaboradorDto from "./empresa_colaborador.dto.js";

var objCapaDato = new CD_EmpresaColaborador();

class CN_EmpresaColaborador {
  //CREATE
  async createEmpresaColaborador(data) {
    return await objCapaDato.createEmpresaColaborador(data);
  }

  //READ GENERAL
  async getEmpresaColaboradores() {
    const result = await objCapaDato.getEmpresaColaboradores();
    var objDto = new EmpresaColaboradorDto(result.rows);
    result.rows = objDto.getData();
    return result;
  }

  //READ GENERAL ID
  async getEmpresaColaboradoresId(id) {
    const result = await objCapaDato.getEmpresaColaboradoresId(id);
    var objDto = new EmpresaColaboradorDto(result.rows);
    result.rows = objDto.getData();
    return result;
  }

  //READ ID
  async getEmpresaColaborador(id) {
    const result = await objCapaDato.getEmpresaColaborador(id);
    var objDto = new EmpresaColaboradorDto(result.rows);
    result.rows = objDto.getData();
    return result;
  }

  //UPDATE
  async updateEmpresaColaborador(id, data) {
    return await objCapaDato.updateEmpresaColaborador(id, data);
  }

  //DELETE
  async deleteEmpresaColaborador(id) {
    return await objCapaDato.deleteEmpresaColaborador(id);
  }
}

export default CN_EmpresaColaborador;
