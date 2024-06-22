import { Router } from "express";
import {
    createEmpresaVisita,
<<<<<<< HEAD
=======
    // deleteEmpresaAgenda,
>>>>>>> f93e54778e1518caf039645f42c06c291d80ee39
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
<<<<<<< HEAD
=======
// //DELETE
// router.delete("/:id", deleteEmpresaAgenda);
>>>>>>> f93e54778e1518caf039645f42c06c291d80ee39
//VIEW
router.get("/", view);

//PRUEBA
router.get("/prueba", prueba);

export default router;