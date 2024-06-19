import { Router } from "express";
import {
    createEmpresaColaborador,
    deleteEmpresaColaborador,
    getEmpresaColaborador,
    getEmpresasRedes,
    getEmpresasRedesId,
    prueba,
    updateEmpresaColaborador,
    view
} from "./empresa_colaborador.controller.js";
import { isAuth } from "../../middleware/auth.middleware.js"

const router = Router();
//CREATE
router.post("/create", createEmpresaColaborador);
//GET GENERAL
router.get("/list", getEmpresasRedes);
//GET GENERAL ID
router.get("/list/:id", getEmpresasRedesId);
//GET ID
router.get("/:id", getEmpresaColaborador);
//UPDATE
router.patch("/:id", updateEmpresaColaborador);
//DELETE
router.delete("/:id", deleteEmpresaColaborador);
//VIEW
router.get("/", view);

//PRUEBA
router.get("/prueba", prueba);

export default router;