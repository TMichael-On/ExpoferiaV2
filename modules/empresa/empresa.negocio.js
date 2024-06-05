import CD_Empresa from "./empresa.datos.js";
import EmpresaDto from "./empresa.dto.js";
import helpers from "../helpers.js";

var objCapaDato = new CD_Empresa();
var objHelpers = new helpers();
// var objDto = new EmpresaDto();

class CN_Empresa {
  //CREATE
  async createEmpresa(req) {
    let message = "success";
    let result
    const data = req.body;
    const img = req.files[0].buffer
    try {      
      // result = await objCapaDato.createEmpresa(data);
      // if (result.message != "success") {
      //   return result
      // }
      const destino = 'imagenes/' + req.files[0].originalname +'.png';
      await objHelpers.guardarImagen(req.files[0], destino);
    } catch (error) {
      message = "Algo salió mal en CN asda: " + error.message;
    }
    return { message };
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
