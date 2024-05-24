import { Router } from "express";
import {
    createEmpresa,
    deleteEmpresa,
    getEmpresa,
    getEmpresas,
    prueba,
    updateEmpresa,
    view
} from "./empresa.controller.js";

const router = Router();
//CREATE
router.post("/create", createEmpresa);
//GET GENERAL
router.get("/list", getEmpresas);
//GET ID
router.get("/:id", getEmpresa);
//UPDATE
router.patch("/:id", updateEmpresa);
//DELETE
router.delete("/:id", deleteEmpresa);
//VIEW
router.get("/", view);

//PRUEBA
router.get("/prueba", prueba);

export default router;