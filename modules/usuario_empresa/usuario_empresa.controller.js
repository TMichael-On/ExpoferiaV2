import CN_UsuarioEmpresa from "./usuario_empresa.negocio.js";

//CREATE
export const createUsuarioEmpresa = async (req, res) => {
  const objCapaEmpresa = new CN_UsuarioEmpresa();
  const data = req.body;
  let errors = [];
  if (!data.nombre) {
    errors.push("Nombre is required");
  }
  if (!data.apellido) {
    errors.push("Apellido is required");
  }
  if (!data.correo) {
    errors.push("Correo is required");
  }
  if (!data.telefono) {
    errors.push("Telefono is required");
  }
  if (!data.contrasena) {
    errors.push("Contrasena is required");
  }
  if (errors.length > 0) {
    return res
      .status(400)
      .json({ message: "Failed", error: "Datos requeridos", rows: [] });
  }
  try {
    const rows = await objCapaEmpresa.createUsuarioEmpresa(data);
    return res.status(200).json(rows);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Algo salió mal en CP: " + error.message });
  }
};

//READ GENERAL
export const getUsuarioEmpresas = async (req, res) => {
  const objCapaEmpresa = new CN_UsuarioEmpresa();
  try {
    const rows = await objCapaEmpresa.getUsuarioEmpresas();    
    return res.status(200).json(rows);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Algo salió mal en CP: " + error.message });
  }
};

//READ
export const getUsuarioEmpresa = async (req, res) => {
  const objCapaEmpresa = new CN_UsuarioEmpresa();
  try {
    const rows = await objCapaEmpresa.getUsuarioEmpresa(req.params.id);
    return res.status(200).json(rows);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Algo salió mal en CP: " + error.message });
  }
};

//UPDATE
export const updateUsuarioEmpresa = async (req, res) => {
  const objCapaEmpresa = new CN_UsuarioEmpresa();
  const data = req.body;
  if (Object.keys(data).length === 0) {
    return res
      .status(400)
      .json({ message: "Failed", error: "Datos requeridos", rows: [] });
  }

  try {
    const rows = await objCapaEmpresa.updateUsuarioEmpresa(req.params.id, data);
    return res.status(200).json(rows);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Algo salió mal en CP: " + error.message });
  }
};

//DELETE
export const deleteUsuarioEmpresa = async (req, res) => {
  const objCapaEmpresa = new CN_UsuarioEmpresa();
  try {
    const rows = await objCapaEmpresa.deleteUsuarioEmpresa(req.params.id);
    return res.status(200).json(rows);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Algo salió mal en CP: " + error.message });
  }
};
