import { Router } from "express";
import {
    createEmpresaRedes,
    deleteEmpresaRedes,
    getEmpresaRedes,
    getEmpresasRedes,
    prueba,
    updateEmpresaRedes
} from "./empresa_redes.controller.js";

const router = Router();
//CREATE
router.post("/create", createEmpresaRedes);
//GET GENERAL
router.get("", getEmpresasRedes);
//GET ID
router.get("/:id", getEmpresaRedes);
//UPDATE
router.patch("/:id", updateEmpresaRedes);
//DELETE
router.delete("/:id", deleteEmpresaRedes);

//PRUEBA
router.get("/prueba", prueba);

export default router;