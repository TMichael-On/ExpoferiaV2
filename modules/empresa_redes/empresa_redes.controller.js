import CN_EmpresaRedes from "./empresa_redes.negocio.js";

// CREATE - Capa de Presentación
export const createEmpresaRedes = async (req, res) => {
  const objCapaEmpresaRedes = new CN_EmpresaRedes();
  const data = req.body;
  let errors = [];
  if (!data.nombre) {
    errors.push("Nombre is required");
  }
  if (!data.url) {
    errors.push("URL is required");
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
    const result = await objCapaEmpresaRedes.createEmpresaRedes(data);
    return res.status(200).json(result);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Algo error ocurrio en CP: " + error.message });
  }
};

//READ GENERAL
export const getEmpresasRedes = async (req, res) => {
  const objCapaEmpresaRedes = new CN_EmpresaRedes();
  try {
    const result = await objCapaEmpresaRedes.getEmpresasRedes();
    res.json(result);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Algo error ocurrio en CP: " + error.message });
  }
};

//READ
export const getEmpresaRedes = async (req, res) => {
  const objCapaEmpresaRedes = new CN_EmpresaRedes();
  try {
    const result = await objCapaEmpresaRedes.getEmpresaRedes(req.params.id);
    res.json(result);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Algo error ocurrio en CP: " + error.message });
  }
};

//UPDATE
export const updateEmpresaRedes = async (req, res) => {
  const objCapaEmpresaRedes = new CN_EmpresaRedes();
  const data = req.body;
  if (Object.keys(data).length === 0) {
    return res
      .status(400)
      .json({ message: "Failed", error: "Datos requeridos", rows: [] });
  }
  try {
    const result = await objCapaEmpresaRedes.updateEmpresaRedes(
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
export const deleteEmpresaRedes = async (req, res) => {
  const objCapaEmpresaRedes = new CN_EmpresaRedes();
  try {
    const result = await objCapaEmpresaRedes.deleteEmpresaRedes(req.params.id);
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
  res.render('empresa_redes/empresa_redes');
};