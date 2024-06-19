import CD_EmpresaColaborador from "./empresa_colaborador.datos.js";
import EmpresaColaboradorDto from "./empresa_colaborador.dto.js";
import helpers from "../helpers.js";

const objCapaDato = new CD_EmpresaColaborador();
const objHelpers = new helpers();

class CN_EmpresaColaborador {
  //CREATE
  async createEmpresaColaborador(req) {
    var data = req.body;
    let message = "success";
    data.empresa_id = req.user.id_empresa
    // if (typeof data !== 'object' || data === null || Array.isArray(data)) {
    //   return { message };
    // }  
    if (Object.values(data).some(value => value === '')) {
      return { message: 'Datos requeridos' }
    }
    try {
      const now = new Date();
      const nombre_completo = data.nombre_completo.replace(/\s+/g, '_');
      const img_nombre = nombre_completo + '_' + objHelpers.formatDate(now) + '.png'
      data.image = img_nombre
      const result = await objCapaDato.createEmpresaColaborador(data);
      if (result.message != "success") {
        return result
      }
      const destino = 'public/imagenes/' + img_nombre;
      await objHelpers.guardarImagen(req.files[0], destino);
    } catch (error) {
      message = "Algo salió mal en CN: " + error.message;
    }
    return { message };    
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
  async updateEmpresaColaborador(id, req) {
    var data = req.body;

    if (Object.values(data).some(value => value === '')) {
      return { message: 'Datos requeridos' }
    }

    if (data.image) {
      return await objCapaDato.updateEmpresaColaborador(id, data);
    } else {
      let message = "success";
      try {
        //consultar imagen anterior
        const colaborador = await this.getEmpresaColaborador(id)
        const img_ = colaborador.rows[0].Imagen
        //Actualiza la informacion
        const now = new Date();
        const nombre_completo = data.nombre_completo.replace(/\s+/g, '_');
        const img_nombre = nombre_completo + '_' + objHelpers.formatDate(now) + '.png'
        data.image = img_nombre
        const result = await objCapaDato.updateEmpresaColaborador(id, data);
        if (result.message != "success") {
          return result
        }
        //Eliminar imagen anterior        
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
  async deleteEmpresaColaborador(id) {
    let message = "success";
    try {
      const colaborador = await this.getEmpresaColaborador(id)
      const img_ = colaborador.rows[0].Imagen
      const result = await objCapaDato.deleteEmpresaColaborador(id);

      if (result.message != "success") {
        return result
      }

      await objHelpers.eliminarImagen(img_);
    } catch (error) {
      message = "Algo salió mal en CN: " + error.message;
    }
    return { message };
  }
}

export default CN_EmpresaColaborador;
