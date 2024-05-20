import CN_Empresa from "./empresa.negocio.js";

// CREATE - Capa de Presentación
export const createEmpresa = async (req, res) => {
  const objCapaEmpresa = new CN_Empresa();
  try {
      const result = await objCapaEmpresa.createEmpresa(req.body);
      res.json(result);
  } catch (error) {
      return res.status(500).json({ message: "Algo error ocurrio en CP: "+error.message });
  }
};

//READ GENERAL
export const getEmpresas = async (req, res) => {    
    const objCapaEmpresa = new CN_Empresa();
    try {
      const result = await objCapaEmpresa.getEmpresas();
      res.json(result);
    } catch (error) {
      return res.status(500).json({ message: "Algo error ocurrio en CP: "+error.message });
    }
  };

//READ 
export const getEmpresa = async (req, res) => {
  const objCapaEmpresa = new CN_Empresa();
  try {
      const result = await objCapaEmpresa.getEmpresa(req.params.id);
      res.json(result);
  } catch (error) {
      return res.status(500).json({ message: "Algo error ocurrio en CP: "+error.message });
  }
};

//UPDATE 
export const updateEmpresa = async (req, res) => {    
    const objCapaEmpresa = new CN_Empresa();
    try {
      const result = await objCapaEmpresa.updateEmpresa(req.params.id, req.body);
      res.json(result);
    } catch (error) {
      return res.status(500).json({ message: "Algo error ocurrio en CP: "+error.message });
    }
  };

//DELETE 
export const deleteEmpresa = async (req, res) => {    
    const objCapaEmpresa = new CN_Empresa();
    try {
      const result = await objCapaEmpresa.deleteEmpresa(req.params.id);
      res.json(result);
    } catch (error) {
      return res.status(500).json({ message: "Algo error ocurrio en CP: "+error.message });
    }
  };

  export const prueba = async (req, res) => {
    const result = "PRUEBA";
    res.json({result});
  }