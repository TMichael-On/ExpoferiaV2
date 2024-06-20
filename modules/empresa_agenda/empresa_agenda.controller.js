import CN_EmpresaAgenda from "./empresa_agenda.negocio.js";
import CN_Empresa from "../empresa/empresa.negocio.js"

const objCapaEmpresaAgenda = new CN_EmpresaAgenda();
const objEmpresa = new CN_Empresa
// CREATE - Capa de Presentación
export const createEmpresaAgenda = async (req, res) => {    
  try {
    const result = await objCapaEmpresaAgenda.createEmpresaAgenda(
      req
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
  try {
    const result = await objCapaEmpresaAgenda.getEmpresaAgendaes();
    res.json(result);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Algo error ocurrio en CP: " + error.message });
  }
};

//READ GENERAL ID
export const getEmpresaAgendaesId = async (req, res) => {
  const ID_ = req.params.id
  // const ID_ = req.user.id_empresa
  try {
    const result = await objCapaEmpresaAgenda.getEmpresaAgendaesId(
      ID_
    );
    res.json(result);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Algo error ocurrio en CP: " + error.message });
  }
};

//READ
export const getEmpresaAgenda = async (req, res) => {  
  try {
    const result = await objCapaEmpresaAgenda.getEmpresaAgenda(
      req.params.id
    );
    res.json(result);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Algo error ocurrio en CP: " + error.message });
  }
};

//DELETE
export const deleteEmpresaAgenda = async (req, res) => {  
  try {
    const result = await objCapaEmpresaAgenda.deleteEmpresaAgenda(
      req.params.id
    );
    res.json(result);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Algo error ocurrio en CP: " + error.message });
  }
};

//PRUEBA
export const prueba = async (req, res) => {
  const result = "PRUEBA";
  res.json({ result });
};

//VIEW
export const view = async (req, res) => {
  // const id = 8
  // const result = await objEmpresa.getEmpresasId(id);
  // const ID = result.rows[0].id
  res.render("agenda/empresa_agenda");
};
