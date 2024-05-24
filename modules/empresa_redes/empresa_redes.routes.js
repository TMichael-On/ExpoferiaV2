import { Router } from "express";
import {
    createEmpresaRedes,
    deleteEmpresaRedes,
    getEmpresaRedes,
    getEmpresasRedes,
    prueba,
    updateEmpresaRedes,
    view
} from "./empresa_redes.controller.js";

const router = Router();
//CREATE
router.post("/create", createEmpresaRedes);
//GET GENERAL
router.get("/list", getEmpresasRedes);
//GET ID
router.get("/:id", getEmpresaRedes);
//UPDATE
router.patch("/:id", updateEmpresaRedes);
//DELETE
router.delete("/:id", deleteEmpresaRedes);
//VIEW
router.get("/", view);

//PRUEBA
router.get("/prueba", prueba);

export default router;