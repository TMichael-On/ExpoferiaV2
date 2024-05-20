import pool from "../../database/conection-db.js";

class CD_EmpresaProducto {
  
  //CREATE
  async createEmpresaProducto(data) {
    let message = "";
    let rows;
    try {
      const [results] = await pool.query(
        "SELECT * FROM expo_empresa_producto WHERE producto_nombre  = ?",
        [data.nombre]
      );
      rows = results[0];
      if (rows) {
        message = "Producto "+data.nombre+" ya existente";
      } else {
        const [result] = await pool.query(
          "INSERT INTO expo_empresa_producto (producto_nombre , producto_categoria, producto_stock, producto_precio, producto_moneda, producto_estado, empresa_id) VALUES (?,?,?,?,?,'1',?)",
          [
            data.nombre ,
            data.categoria,
            data.stock,
            data.precio,
            data.moneda,
            data.empresa_id
          ]
        );
        rows = result;
        message = "success";
      }
    } catch (error) {
      message = "Algo salió mal en CD: "+error.message;
      rows = [];
    }
    return { message, rows };
  }
  
  //READ GENERAL
  async getEmpresaProductos() {
    let message = "";
    let rows;
    try {
      [rows] = await pool.query("SELECT * FROM expo_empresa_producto");
      message = "success";
    } catch (error) {
      message = "Algo salió mal en CD: "+error.message;
      rows = [];
    }
    return { message: message, rows: rows };
  }
  
  //READ ID
  async getEmpresaProducto(id) {
    let message = "";
    let row;
    try {
      const [results] = await pool.query(
        "SELECT * FROM expo_empresa_producto WHERE producto_id = ?",
        [id]
      );
      row = results[0];
      if (row) {
        message = "success";
      } else {
        message = "Producto no encontrado";
        row = {};
      }
    } catch (error) {
      message = "Algo salió mal en CD: "+error.message;
      row = {};
    }
    return { message, row };
  }
  
  //UPDATE
  async updateEmpresaProducto(id, data) {
    let sql = "UPDATE expo_empresa_producto SET ";
    const params = [];
    const updates = [];
    if (data.nombre !== undefined) {
      updates.push("producto_nombre = ?");
      params.push(data.nombre);
    }
    if (data.categoria !== undefined) {
      updates.push("producto_categoria = ?");
      params.push(data.categoria);
    }
    if (data.stock !== undefined) {
      updates.push("producto_stock = ?");
      params.push(data.stock);
    }
    if (data.precio !== undefined) {
      updates.push("producto_precio = ?");
      params.push(data.precio);
    }
    if (data.moneda !== undefined) {
      updates.push("producto_moneda = ?");
      params.push(data.moneda);
    }
    if (data.estado !== undefined) {
      updates.push("producto_estado = ?");
      params.push(data.estado);
    }
    if (data.empresa_id !== undefined) {
      updates.push("empresa_id = ?");
      params.push(data.empresa_id);
    }
    if (updates.length === 0) {
      return {
        message: "No se proporcionaron datos para actualizar.",
        rows: {},
      };
    }

    sql += updates.join(", ");
    sql += " WHERE producto_id = ?";
    params.push(id);

    try {
      const [rows] = await pool.query(sql, params);
      let message = "";
      if (rows.affectedRows === 1) {
        message = "success";
      } else {
        message = "Producto no encontrado";
        return { message, rows: {} };
      }
      return { message, rows };
    } catch (error) {
      const message = "Algo salió mal en CD: :+error.message " + error.message;
      return { message, rows: [] };
    }
  }

  
  //DELETE
  async deleteEmpresaProducto(id) {
    let message = "";
    let rows;
    try {
      [rows] = await pool.query(
        "DELETE FROM expo_empresa_producto WHERE producto_id = (?)",
        [id]
      );
      if (rows.affectedRows == 1) {
        message = "success";
      } else {
        message = "Producto no encontrado";
        rows = {};
      }
    } catch (error) {
      message = "Algo salió mal en CD: "+error.message;
      rows = [];
    }
    return { message: message, rows: rows };
  }
}

export default CD_EmpresaProducto;
