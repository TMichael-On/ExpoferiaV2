import CN_UsuarioEmpresa from "./usuario_empresa.negocio.js";

//CREATE
export const createUsuarioEmpresa = async (req, res) => {  
    const objCapaEmpresa = new CN_UsuarioEmpresa();
    try {
      const rows = await objCapaEmpresa.createUsuarioEmpresa(req.body);
      res.json(rows);
    } catch (error) {
      return res.status(500).json({ message: "Something goes wrong in CP" });
    }
  };

//READ GENERAL
export const getUsuarioEmpresas = async (req, res) => {    
    const objCapaEmpresa = new CN_UsuarioEmpresa();
    try {
      const rows = await objCapaEmpresa.getUsuarioEmpresas();
      res.json(rows);
    } catch (error) {
      return res.status(500).json({ message: "Something goes wrong in CP" });
    }
  };

//READ 
export const getUsuarioEmpresa = async (req, res) => {    
    const objCapaEmpresa = new CN_UsuarioEmpresa();
    try {
      const rows = await objCapaEmpresa.getUsuarioEmpresa(req.params.id);
      res.json(rows);
    } catch (error) {
      return res.status(500).json({ message: "Something goes wrong in CP" });
    }
  };

//UPDATE 
export const updateUsuarioEmpresa = async (req, res) => {    
    const objCapaEmpresa = new CN_UsuarioEmpresa();
    try {
      const rows = await objCapaEmpresa.updateUsuarioEmpresa(req.params.id, req.body);
      res.json(rows);
    } catch (error) {
      return res.status(500).json({ message: "Something goes wrong in CP" });
    }
  };

//DELETE 
export const deleteUsuarioEmpresa = async (req, res) => {    
    const objCapaEmpresa = new CN_UsuarioEmpresa();
    try {
      const rows = await objCapaEmpresa.deleteUsuarioEmpresa(req.params.id);
      res.json(rows);
    } catch (error) {
      return res.status(500).json({ message: "Something goes wrong in CP" });
    }
  };