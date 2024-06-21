import CN_EmpresaVisita from "./empresa_visita.negocio.js";
import CN_Empresa from "../empresa/empresa.negocio.js"

const objCapaEmpresaVisita = new CN_EmpresaVisita();
const objEmpresa = new CN_Empresa
// CREATE - Capa de Presentación
export const createEmpresaVisita = async (req, res) => {    
  try {
    const result = await objCapaEmpresaVisita.createEmpresaVisita(
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
export const getEmpresaVisitas = async (req, res) => {  
  try {
    const result = await objCapaEmpresaVisita.getEmpresaVisitas();
    res.json(result);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Algo error ocurrio en CP: " + error.message });
  }
};

//READ GENERAL ID
export const getEmpresaVisitasId = async (req, res) => {
  const ID_ = req.params.id
  // const ID_ = req.user.id_empresa
  try {
    const result = await objCapaEmpresaVisita.getEmpresaVisitasId(
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
export const getEmpresaVisita = async (req, res) => {  
  try {
    const result = await objCapaEmpresaVisita.getEmpresaVisitas(
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
  res.render("visita/empresa_visita");
};
