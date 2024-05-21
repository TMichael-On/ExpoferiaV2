import CN_EmpresaColaborador from "./empresa_colaborador.negocio.js";

// CREATE - Capa de Presentación
export const createEmpresaColaborador = async (req, res) => {
  const objCapaEmpresaColaborador = new CN_EmpresaColaborador();
  const data = req.body;
  if (Object.keys(data).length === 0) {
    return res
      .status(400)
      .json({ message: "Failed", error: "Datos requeridos", rows: [] });
  }
  try {
    const result = await objCapaEmpresaColaborador.createEmpresaColaborador(
      data
    );
    res.json(result);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Algo error ocurrio en CP: " + error.message });
  }
};

//READ GENERAL
export const getEmpresasRedes = async (req, res) => {
  const objCapaEmpresaColaborador = new CN_EmpresaColaborador();
  try {
    const result = await objCapaEmpresaColaborador.getEmpresaColaboradores();
    res.json(result);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Algo error ocurrio en CP: " + error.message });
  }
};

//READ
export const getEmpresaColaborador = async (req, res) => {
  const objCapaEmpresaColaborador = new CN_EmpresaColaborador();
  try {
    const result = await objCapaEmpresaColaborador.getEmpresaColaborador(
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
export const updateEmpresaColaborador = async (req, res) => {
  const objCapaEmpresaColaborador = new CN_EmpresaColaborador();
  const data = req.body;
  let errors = [];
  if (!data.nombre_completo) {
    errors.push("Nombre is required");
  }
  if (!data.telefono) {
    errors.push("Teléfono is required");
  }
  if (!data.area) {
    errors.push("Área is required");
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
    const result = await objCapaEmpresaColaborador.updateEmpresaColaborador(
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
export const deleteEmpresaColaborador = async (req, res) => {
  const objCapaEmpresaColaborador = new CN_EmpresaColaborador();
  try {
    const result = await objCapaEmpresaColaborador.deleteEmpresaColaborador(
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
