import CN_EmpresaProducto from "./empresa_producto.negocio.js";

const objCapaEmpresaProducto = new CN_EmpresaProducto();
// CREATE - Capa de Presentación
export const createEmpresaProducto = async (req, res) => {  
  try {
    const result = await objCapaEmpresaProducto.createEmpresaProducto(req);
    res.json(result);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Algo salió mal en CP: " + error.message });
  }
};

//READ GENERAL
export const getEmpresaProductos = async (req, res) => {  
  try {
    const result = await objCapaEmpresaProducto.getEmpresaProductos();
    res.json(result);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Algo salió mal en CP: " + error.message });
  }
};

//READ GENERAL ID
export const getEmpresaProductosId = async (req, res) => {
  const ID_ = req.params.id
  // const ID_ = req.user.id_empresa
  try {
    const result = await objCapaEmpresaProducto.getEmpresaProductosId(
      ID_
    );
    res.json(result);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Algo salió mal en CP: " + error.message });
  }
};

//READ
export const getEmpresaProducto = async (req, res) => {  
  try {
    const result = await objCapaEmpresaProducto.getEmpresaProducto(
      req.params.id
    );
    res.json(result);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Algo salió mal en CP: " + error.message });
  }
};

//UPDATE
export const updateEmpresaProducto = async (req, res) => {  
  try {
    const result = await objCapaEmpresaProducto.updateEmpresaProducto(
      req.params.id,
      req
    );
    res.json(result);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Algo salió mal en CP: " + error.message });
  }
};

//DELETE
export const deleteEmpresaProducto = async (req, res) => {  
  try {
    const result = await objCapaEmpresaProducto.deleteEmpresaProducto(
      req.params.id
    );
    res.json(result);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Algo salió mal en CP: " + error.message });
  }
};

export const prueba = async (req, res) => {
  const result = "PRUEBA";
  res.json({ result });
};

//VIEW
export const view = async (req, res) => {
  res.render("empresa_producto/empresa_producto");
};
