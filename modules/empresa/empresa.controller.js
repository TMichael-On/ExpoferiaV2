import CN_Empresa from "./empresa.negocio.js";

// CREATE - Capa de Presentación
export const createEmpresa = async (req, res) => {
  const objCapaEmpresa = new CN_Empresa();
  const data = req.body;
  let errors = [];
  if (!data.nombre) {
    errors.push("Nombre is required");
  }
  if (!data.numero_ruc) {
    errors.push("Número RUC is required");
  }
  if (!data.rubro) {
    errors.push("Rubro is required");
  }
  if (!data.direccion) {
    errors.push("Dirección is required");
  }
  if (!data.telefono) {
    errors.push("Teléfono is required");
  }
  if (!data.correo) {
    errors.push("Correo is required");
  }
  if (!data.descripcion) {
    errors.push("Descripción is required");
  }
  if (!data.historia) {
    errors.push("Historia is required");
  }
  if (!data.usuario_id) {
    errors.push("Usuario is required");
  }
  if (errors.length > 0) {
    return res
      .status(400)
      .json({ message: "Failed", error: "Datos requeridos", rows: [] });
  }
  try {
    const result = await objCapaEmpresa.createEmpresa(data);
    res.json(result);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Algo error ocurrio en CP: " + error.message });
  }
};

//READ GENERAL
export const getEmpresas = async (req, res) => {
  const objCapaEmpresa = new CN_Empresa();
  try {
    const result = await objCapaEmpresa.getEmpresas();
    res.json(result);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Algo error ocurrio en CP: " + error.message });
  }
};

//READ GENERAL ID
export const getEmpresasId = async (req, res) => {
  const objCapaEmpresa = new CN_Empresa();
  try {
    const result = await objCapaEmpresa.getEmpresasId(req.params.id);
    res.json(result);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Algo error ocurrio en CP: " + error.message });
  }
};

//READ BY ID
export const getEmpresa = async (req, res) => {
  const objCapaEmpresa = new CN_Empresa();
  try {
    const result = await objCapaEmpresa.getEmpresa(req.params.id);
    res.json(result);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Algo error ocurrio en CP: " + error.message });
  }
};

//UPDATE
export const updateEmpresa = async (req, res) => {
  const objCapaEmpresa = new CN_Empresa();
  const data = req.body;
  // if (Object.keys(data).length === 0) {
  //   return res
  //     .status(400)
  //     .json({ message: "Failed", error: "Datos requeridos", rows: [] });
  // }
  try {
    const result = await objCapaEmpresa.updateEmpresa(req.params.id, data);
    res.json(result);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Algo error ocurrio en CP: " + error.message });
  }
};

//DELETE
export const deleteEmpresa = async (req, res) => {
  const objCapaEmpresa = new CN_Empresa();
  try {
    const result = await objCapaEmpresa.deleteEmpresa(req.params.id);
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

//VIEW
export const view = async (req, res) => {
  res.render("empresa/empresa", { alwaysTrue: false });
};
