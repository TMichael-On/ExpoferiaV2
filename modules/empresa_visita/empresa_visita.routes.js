import { Router } from "express";
import {
    createEmpresaAgenda,
    deleteEmpresaAgenda,
    getEmpresaAgenda,
    getEmpresasAgenda,
    getEmpresaAgendaesId,
    prueba,
    view
} from "./empresa_visita.controller.js";
// import { isAuth } from "../../middleware/auth.middleware.js"

const router = Router();
//CREATE
router.post("/create",  createEmpresaAgenda);
//GET GENERAL
router.get("/list", getEmpresasAgenda);
//GET GENERAL ID
router.get("/list/:id",  getEmpresaAgendaesId);
//GET ID
router.get("/:id", getEmpresaAgenda);
//DELETE
router.delete("/:id", deleteEmpresaAgenda);
//VIEW
router.get("/", view);

//PRUEBA
router.get("/prueba", prueba);

export default router;