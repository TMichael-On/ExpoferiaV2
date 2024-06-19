import CN_EmpresaColaborador from "./empresa_colaborador.negocio.js";
import CN_Empresa from "../empresa/empresa.negocio.js"

const objCapaEmpresaColaborador = new CN_EmpresaColaborador();
const objEmpresa = new CN_Empresa
// CREATE - Capa de Presentación
export const createEmpresaColaborador = async (req, res) => {    
  try {
    const result = await objCapaEmpresaColaborador.createEmpresaColaborador(
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
    const result = await objCapaEmpresaColaborador.getEmpresaColaboradores();
    res.json(result);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Algo error ocurrio en CP: " + error.message });
  }
};

//READ GENERAL ID
export const getEmpresaColaboradoresId = async (req, res) => {
  // const ID_ = req.params.id
  const ID_ = req.user.id_empresa
  try {
    const result = await objCapaEmpresaColaborador.getEmpresaColaboradoresId(
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
export const getEmpresaColaborador = async (req, res) => {  
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
  try {
    const result = await objCapaEmpresaColaborador.updateEmpresaColaborador(
      req.params.id,
      req
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
  res.render("empresa_colaborador/empresa_colaborador");
};
