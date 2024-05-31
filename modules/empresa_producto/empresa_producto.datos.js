import pool from "../../database/conection-db.js";

class CD_EmpresaProducto {
  //CREATE
  async createEmpresaProducto(data) {
    let message = "success";
    let rows = [];
    try {
      [rows] = await pool.query(
        "SELECT * FROM expo_empresa_producto WHERE producto_nombre  = ?",
        [data.nombre]
      );
      if (rows.length > 0) {
        message = "Producto " + data.nombre + " ya existente";
      } else {
        [rows] = await pool.query(
          "INSERT INTO expo_empresa_producto (producto_nombre , producto_categoria, producto_stock, producto_precio, producto_moneda, producto_estado, empresa_id) VALUES (?,?,?,?,?,'1',?)",
          [
            data.nombre,
            data.categoria,
            data.stock,
            data.precio,
            data.moneda,
            data.empresa_id,
          ]
        );
      }
    } catch (error) {
      message = "Algo salió mal en CD: " + error.message;
    }
    return { message: message, rows: rows };
  }

  //READ GENERAL
  async getEmpresaProductos() {
    let message = "success";
    let rows = [];
    try {
      [rows] = await pool.query("SELECT * FROM expo_empresa_producto ORDER BY producto_id");
    } catch (error) {
      message = "Algo salió mal en CD: " + error.message;
      rows = [];
    }
    return { message: message, rows: rows };
  }

  //READ ID
  async getEmpresaProducto(id) {
    let message = "success";
    let rows = [];
    try {
      [rows] = await pool.query(
        "SELECT * FROM expo_empresa_producto WHERE producto_id = ?",
        [id]
      );
      if (rows.length === 0) {
        message = "Producto no encontrado";
      }
    } catch (error) {
      message = "Algo salió mal en CD: " + error.message;
    }
    return { message: message, rows: rows };
  }

  //UPDATE
  async updateEmpresaProducto(id, data) {
    let sql = "UPDATE expo_empresa_producto SET ";
    let message = "success";
    let rows = [];
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
      return { message: "Sin datos para actualizar", rows: [] };
    } else {
      sql += updates.join(", ");
      sql += " WHERE producto_id = ?";
      params.push(id);
      try {
        [rows] = await pool.query(sql, params);
        if (rows.affectedRows === 0) {
          message = "Producto no encontrado";
        }
      } catch (error) {
        message = "Algo salió mal en CD: :+error.message " + error.message;
      }

      return { message: message, rows: rows };
    }
  }

  //DELETE
  async deleteEmpresaProducto(id) {
    let message = "success";
    let rows = [];
    try {
      [rows] = await pool.query(
        "DELETE FROM expo_empresa_producto WHERE producto_id = (?)",
        [id]
      );
      if (rows.affectedRows == 0) {
        message = "Producto no encontrado";
      }
    } catch (error) {
      message = "Algo salió mal en CD: " + error.message;
    }
    return { message: message, rows: rows };
  }
}

export default CD_EmpresaProducto;
