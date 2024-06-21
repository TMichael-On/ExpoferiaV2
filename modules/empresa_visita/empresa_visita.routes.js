import { Router } from "express";
import {
    createEmpresaVisita,
    getEmpresaVisita,
    getEmpresaVisitas,
    getEmpresaVisitasId,
    prueba,
    view
} from "./empresa_visita.controller.js";
// import { isAuth } from "../../middleware/auth.middleware.js"

const router = Router();
//CREATE
router.post("/create",  createEmpresaVisita);
//GET GENERAL
router.get("/list", getEmpresaVisitas);
//GET GENERAL ID
router.get("/list/:id",  getEmpresaVisitasId);
//GET ID
router.get("/:id", getEmpresaVisita);
//VIEW
router.get("/", view);

//PRUEBA
router.get("/prueba", prueba);

export default router;