import CD_EmpresaProducto from "./empresa_producto.datos.js";

var objCapaDato = new CD_EmpresaProducto();

class CN_EmpresaProducto {

    //CREATE
    async createEmpresaProducto(data) {
        return await objCapaDato.createEmpresaProducto(data);
    }

    //READ GENERAL
    async getEmpresaProductos() {
        return await objCapaDato.getEmpresaProductos();
    }

    //READ ID
    async getEmpresaProducto(id) {
        return await objCapaDato.getEmpresaProducto(id);
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