import { Router } from "express";
import {
    createEmpresaAgenda,
    deleteEmpresaAgenda,
    getEmpresaAgenda,
    getEmpresasRedes,
    getEmpresaAgendaesId,
    prueba,
    updateEmpresaAgenda,
    view
} from "./empresa_agenda.controller.js";
// import { isAuth } from "../../middleware/auth.middleware.js"

const router = Router();
//CREATE
router.post("/create",  createEmpresaAgenda);
//GET GENERAL
router.get("/list", getEmpresasRedes);
//GET GENERAL ID
router.get("/list/:id",  getEmpresaAgendaesId);
//GET ID
router.get("/:id", getEmpresaAgenda);
//UPDATE
// router.patch("/:id", updateEmpresaAgenda);
//DELETE
router.delete("/:id", deleteEmpresaAgenda);
//VIEW
router.get("/", view);

//PRUEBA
router.get("/prueba", prueba);

export default router;