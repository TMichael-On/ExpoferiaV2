import CD_EmpresaProducto from "./empresa_producto.datos.js";
import EmpresaProductoDto from "./empresa_producto.dto.js";

var objCapaDato = new CD_EmpresaProducto();

class CN_EmpresaProducto {

    //CREATE
    async createEmpresaProducto(data) {
        return await objCapaDato.createEmpresaProducto(data);
    }

    //READ GENERAL
    async getEmpresaProductos() {
        const result = await objCapaDato.getEmpresaProductos();
        var objDto = new EmpresaProductoDto(result.rows);
        result.rows = objDto.getData()
        return result
    }

    //READ ID
    async getEmpresaProducto(id) {
        const result = await objCapaDato.getEmpresaProducto(id);
        var objDto = new EmpresaProductoDto(result.rows);
        result.rows = objDto.getData()
        return result
    }

    //UPDATE 
    async updateEmpresaProducto(id, data) {
        return await objCapaDato.updateEmpresaProducto(id, data);
    }

    //DELETE 
    async deleteEmpresaProducto(id) {
        return await objCapaDato.deleteEmpresaProducto(id);
    }
}

export default CN_EmpresaProducto;