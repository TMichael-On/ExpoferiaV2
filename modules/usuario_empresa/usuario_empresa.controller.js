import CN_UsuarioEmpresa from "./usuario_empresa.negocio.js";

const objUsuarioEmpresa = new CN_UsuarioEmpresa();

//CREATE
export const createUsuarioEmpresa = async (req, res) => {  
  const data = req.body; 
  try {
    const rows = await objUsuarioEmpresa.createUsuarioEmpresa(data);
    return res.status(200).json(rows);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Algo salió mal en CP: " + error.message });
  }
};

//READ GENERAL
export const getUsuarioEmpresas = async (req, res) => {  
  try {
    const rows = await objUsuarioEmpresa.getUsuarioEmpresas();    
    return res.status(200).json(rows);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Algo salió mal en CP: " + error.message });
  }
};

//READ
export const getUsuarioEmpresa = async (req, res) => {  
  try {
    const rows = await objUsuarioEmpresa.getUsuarioEmpresa(req.params.id);
    return res.status(200).json(rows);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Algo salió mal en CP: " + error.message });
  }
};

//UPDATE
export const updateUsuarioEmpresa = async (req, res) => {  
  const data = req.body;
  if (Object.keys(data).length === 0) {
    return res
      .status(400)
      .json({ message: "Failed", error: "Datos requeridos", rows: [] });
  }

  try {
    const rows = await objUsuarioEmpresa.updateUsuarioEmpresa(req.params.id, data);
    return res.status(200).json(rows);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Algo salió mal en CP: " + error.message });
  }
};

//DELETE
export const deleteUsuarioEmpresa = async (req, res) => {  
  try {
    const rows = await objUsuarioEmpresa.deleteUsuarioEmpresa(req.params.id);
    return res.status(200).json(rows);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Algo salió mal en CP: " + error.message });
  }
};

//VIEW
export const view = async (req, res) => {
  res.render('empresa_redes/usuario_empresa');
};