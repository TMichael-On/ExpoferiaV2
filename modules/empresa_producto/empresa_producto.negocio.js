import CD_EmpresaProducto from "./empresa_producto.datos.js";
import EmpresaProductoDto from "./empresa_producto.dto.js";
import helpers from "../helpers.js";

var objCapaDato = new CD_EmpresaProducto();
const objHelpers = new helpers();

class CN_EmpresaProducto {
  //CREATE
  async createEmpresaProducto(req) {
    var data = req.body;
    let message = "success";
    data.empresa_id = req.user.id_empresa
    
    try {
      if (Object.values(data).some(value => value === '')) {
        return { message: 'Datos requeridos' }
      }

      const now = new Date();
      const nombre = data.nombre.replace(/\s+/g, '_');
      const img_nombre = nombre + '_' + objHelpers.formatDate(now) + '.png'
      data.image = img_nombre
      const result = await objCapaDato.createEmpresaProducto(data);
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
  async getEmpresaProductos() {
    const result = await objCapaDato.getEmpresaProductos();
    // var objDto = new EmpresaProductoDto(result.rows);
    // result.rows = objDto.getData();
    return result;
  }

  //READ GENERAL ID
  async getEmpresaProductosId(id) {
    const result = await objCapaDato.getEmpresaProductosId(id);
    var objDto = new EmpresaProductoDto(result.rows);
    result.rows = objDto.getData();
    return result;
  }

  //READ ID
  async getEmpresaProducto(id) {
    const result = await objCapaDato.getEmpresaProducto(id);
    var objDto = new EmpresaProductoDto(result.rows);
    result.rows = objDto.getData();
    return result;
  }

  //UPDATE
  async updateEmpresaProducto(id, req) {
    var data = req.body;
    if (Object.values(data).some(value => value === '')) {
      return { message: 'Datos requeridos' }
    }
    if (data.image) {
      return await objCapaDato.updateEmpresaProducto(id, data);
    } else {
      let message = "success";
      try {
        //consultar imagen anterior
        const producto = await this.getEmpresaProducto(id)
        const img_ = producto.rows[0].Imagen
        //Actualiza la informacion
        const now = new Date();
        const nombre = data.nombre.replace(/\s+/g, '_');
        const img_nombre = nombre + '_' + objHelpers.formatDate(now) + '.png'
        data.image = img_nombre
        const result = await objCapaDato.updateEmpresaProducto(id, data);
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
  async deleteEmpresaProducto(id) {
    let message = "success";
    try {
      const producto = await this.getEmpresaProducto(id)
      const img_ = producto.rows[0].Imagen
      const result = await objCapaDato.deleteEmpresaProducto(id);

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

export default CN_EmpresaProducto;
