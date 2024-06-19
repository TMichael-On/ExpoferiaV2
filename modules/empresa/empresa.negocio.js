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
    // let result
    const data = req.body;

    if (Object.values(data).some(value => value === '')) {
      return { message: 'Datos requeridos' }
    }

    try {
      const now = new Date();
      const img_nombre = data.nombre + '_' + objHelpers.formatDate(now) + '.png'
      data.image = img_nombre
      const result = await objCapaDato.createEmpresa(data);
      if (result.message != "success") {
        return result
      }
      const destino = 'public/imagenes/' + img_nombre;
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
  async updateEmpresa(id, req) {
    const data = req.body;

    if (Object.values(data).some(value => value === '')) {
      return { message: 'Datos requeridos' }
    }

    if (data.image) {
      return await objCapaDato.updateEmpresa(id, data);
    }
    else {
      let message = "success";
      try {
        //consultar imagen anterior
        const empresa = await this.getEmpresa(id)
        const img_ = empresa.rows[0].Imagen
        //Actualiza la informacion
        const now = new Date();
        const img_nombre = data.nombre + '_' + objHelpers.formatDate(now) + '.png'
        data.image = img_nombre
        const result = await objCapaDato.updateEmpresa(id, data);
        if (result.message != "success") {
          return result
        }
        //Eliminar imagen anterior
        if (img_ != 'default.png')
          await objHelpers.eliminarImagen(img_);
        //Guardar nueva imagen
        const destino = 'public/imagenes/' + img_nombre;
        await objHelpers.guardarImagen(req.files[0], destino);
      } catch (error) {
        message = "Algo salió mal en CN: " + error.message;
      }
      return { message };
    }
  }

  //DELETE
  async deleteEmpresa(id) {
    let message = "success";
    try {
      const empresa = await this.getEmpresa(id)
      const img_ = empresa.rows[0].Imagen
      const result = await objCapaDato.deleteEmpresa(id);

      if (result.message != "success") {
        return result
      }

      await objHelpers.eliminarImagen(img_);
    } catch (error) {
      message = "Algo salió mal en CN: " + error.message;
    }
    return { message };
  }

  //NEW EMPRESA
  async newEmpresa(data) {
    try {
      if (Object.values(data).some(value => value === '')) {
        return { message: 'Datos requeridos' }
      }

      return await objCapaDato.createEmpresa(data);
    } catch (error) {
      message = "Algo salió mal en CN asda: " + error.message;
    }    
  }
}

export default CN_Empresa;
