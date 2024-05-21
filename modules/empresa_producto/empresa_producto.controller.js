import CN_EmpresaProducto from "./empresa_producto.negocio.js";

// CREATE - Capa de Presentación
export const createEmpresaProducto = async (req, res) => {
  const objCapaEmpresaProducto = new CN_EmpresaProducto();
  const data = req.body;
  let errors = [];
  if (!data.nombre) {
    errors.push("Nombre is required");
  }
  if (!data.categoria) {
    errors.push("Categoria is required");
  }
  if (!data.stock) {
    errors.push("Stock is required");
  }
  if (!data.precio) {
    errors.push("Precio is required");
  }
  if (!data.moneda) {
    errors.push("Moneda is required");
  }
  if (!data.empresa_id) {
    errors.push("Empresa is required");
  }
  if (errors.length > 0) {
    return res
      .status(400)
      .json({ message: "Failed", error: "Datos requeridos", rows: [] });
  }
  try {
    const result = await objCapaEmpresaProducto.createEmpresaProducto(data);
    res.json(result);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Algo error ocurrio en CP: " + error.message });
  }
};

//READ GENERAL
export const getEmpresaProductos = async (req, res) => {
  const objCapaEmpresaProducto = new CN_EmpresaProducto();
  try {
    const result = await objCapaEmpresaProducto.getEmpresaProductos();
    res.json(result);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Algo error ocurrio en CP: " + error.message });
  }
};

//READ
export const getEmpresaProducto = async (req, res) => {
  const objCapaEmpresaProducto = new CN_EmpresaProducto();
  try {
    const result = await objCapaEmpresaProducto.getEmpresaProducto(
      req.params.id
    );
    res.json(result);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Algo error ocurrio en CP: " + error.message });
  }
};

//UPDATE
export const updateEmpresaProducto = async (req, res) => {
  const objCapaEmpresaProducto = new CN_EmpresaProducto();
  const data = req.body;
  if (Object.keys(data).length === 0) {
    return res
      .status(400)
      .json({ message: "Failed", error: "Datos requeridos", rows: [] });
  }
  try {
    const result = await objCapaEmpresaProducto.updateEmpresaProducto(
      req.params.id,
      data
    );
    res.json(result);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Algo error ocurrio en CP: " + error.message });
  }
};

//DELETE
export const deleteEmpresaProducto = async (req, res) => {
  const objCapaEmpresaProducto = new CN_EmpresaProducto();
  try {
    const result = await objCapaEmpresaProducto.deleteEmpresaProducto(
      req.params.id
    );
    res.json(result);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Algo error ocurrio en CP: " + error.message });
  }
};

export const prueba = async (req, res) => {
  const result = "PRUEBA";
  res.json({ result });
};
