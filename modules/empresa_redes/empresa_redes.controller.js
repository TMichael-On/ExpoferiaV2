import CN_EmpresaRedes from "./empresa_redes.negocio.js";

// CREATE - Capa de Presentación
export const createEmpresaRedes = async (req, res) => {
  const objCapaEmpresaRedes = new CN_EmpresaRedes();
  try {
    const result = await objCapaEmpresaRedes.createEmpresaRedes(req.body);
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: "Algo error ocurrio en CP: " + error.message });
  }
};

//READ GENERAL
export const getEmpresasRedes = async (req, res) => {
  const objCapaEmpresaRedes = new CN_EmpresaRedes();
  try {
    const result = await objCapaEmpresaRedes.getEmpresasRedes();
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: "Algo error ocurrio en CP: " + error.message });
  }
};

//READ 
export const getEmpresaRedes = async (req, res) => {
  const objCapaEmpresaRedes = new CN_EmpresaRedes();
  try {
    const result = await objCapaEmpresaRedes.getEmpresaRedes(req.params.id);
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: "Algo error ocurrio en CP: " + error.message });
  }
};

//UPDATE 
export const updateEmpresaRedes = async (req, res) => {
  const objCapaEmpresaRedes = new CN_EmpresaRedes();
  try {
    const result = await objCapaEmpresaRedes.updateEmpresaRedes(req.params.id, req.body);
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: "Algo error ocurrio en CP: " + error.message });
  }
};

//DELETE 
export const deleteEmpresaRedes = async (req, res) => {
  const objCapaEmpresaRedes = new CN_EmpresaRedes();
  try {
    const result = await objCapaEmpresaRedes.deleteEmpresaRedes(req.params.id);
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: "Algo error ocurrio en CP: " + error.message });
  }
};

export const prueba = async (req, res) => {
  const result = "PRUEBA";
  res.json({ result });
}