import { Router } from "express";
import {
    createEmpresaColaborador,
    deleteEmpresaColaborador,
    getEmpresaColaborador,
    getEmpresasRedes,
    prueba,
    updateEmpresaColaborador
} from "./empresa_colaborador.controller.js";

const router = Router();
//CREATE
router.post("/create", createEmpresaColaborador);
//GET GENERAL
router.get("", getEmpresasRedes);
//GET ID
router.get("/:id", getEmpresaColaborador);
//UPDATE
router.patch("/:id", updateEmpresaColaborador);
//DELETE
router.delete("/:id", deleteEmpresaColaborador);

//PRUEBA
router.get("/prueba", prueba);

export default router;