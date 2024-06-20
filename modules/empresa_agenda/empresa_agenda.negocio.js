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

  //UPDATE
  async updateEmpresaAgenda(id, req) {
    var data = req.body;

    if (Object.values(data).some(value => value === '')) {
      return { message: 'Datos requeridos' }
    }

    if (data.image) {
      return await objCapaDato.updateEmpresaAgenda(id, data);
    } else {
      let message = "success";
      try {
        //consultar imagen anterior
        const colaborador = await this.getEmpresaAgenda(id)
        const img_ = colaborador.rows[0].Imagen
        //Actualiza la informacion
        const now = new Date();
        const nombre_completo = data.nombre_completo.replace(/\s+/g, '_');
        const img_nombre = nombre_completo + '_' + objHelpers.formatDate(now) + '.png'
        data.image = img_nombre
        const result = await objCapaDato.updateEmpresaAgenda(id, data);
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
