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
    var data = req.body;

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
    const original = { ...req.body }
    var data = req.body

    var img_principal_nombre
    var img_presentacion_nombre
    var img_historia_nombre

    const now = new Date();
    const destino = 'public/imagenes/'
    let message = "success";

    if (Object.values(data).some(value => value === '')) {
      return { message: 'Datos requeridos' }
    }

    try {
      //consultar imagen anterior
      const empresa = await this.getEmpresa(id)
      const img_principal = empresa.rows[0].Imagen
      const img_presentacion = empresa.rows[0].Imagen_presentacion
      const img_historia = empresa.rows[0].Imagen_historia

      //Actualizar nombre de las imagenes segun la condicion
      if (!data.image) {
        img_principal_nombre = data.nombre + '_pri_' + objHelpers.formatDate(now) + '.png'
        data.image = img_principal_nombre
      }
      if (!data.imagen_presentacion) {
        img_presentacion_nombre = data.nombre + '_pre_' + objHelpers.formatDate(now) + '.png'
        data.imagen_presentacion = img_presentacion_nombre
      }
      if (!data.imagen_historia) {
        img_historia_nombre = data.nombre + '_his_' + objHelpers.formatDate(now) + '.png'
        data.imagen_historia = img_historia_nombre
      }
      //Actualiza la informacion
      const result = await objCapaDato.updateEmpresa(id, data);
      if (result.message != "success") {
        return result
      }

      if (!original.image) {
        //Eliminar imagen anterior
        if (img_principal != 'default.png')
          await objHelpers.eliminarImagen(img_principal);
        //Guardar nueva imagen        
        await objHelpers.guardarImagen(req.files[0], destino + img_principal_nombre);
      }
      if (!original.imagen_presentacion) {
        //Eliminar imagen anterior
        if (img_presentacion != 'default.png')
          await objHelpers.eliminarImagen(img_presentacion);
        //Guardar nueva imagen        
        await objHelpers.guardarImagen(req.files[1], destino + img_presentacion_nombre);
      }
      if (!original.imagen_historia) {
        //Eliminar imagen anterior
        if (img_historia != 'default.png')
          await objHelpers.eliminarImagen(img_historia);
        //Guardar nueva imagen        
        await objHelpers.guardarImagen(req.files[2], destino + img_historia_nombre);
      }

    } catch (error) {
      message = "Algo salió mal en CN: " + error.message;
    }
    return { message };
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
