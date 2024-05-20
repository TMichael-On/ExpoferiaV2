import { Router } from "express";
import { 
    createUsuarioEmpresa, 
    deleteUsuarioEmpresa, 
    getUsuarioEmpresa,
    getUsuarioEmpresas,
    updateUsuarioEmpresa
} from "./usuario_empresa.controller.js";

const router = Router();
//CREATE
router.post("/create", createUsuarioEmpresa);
//GET GENERAL
router.get("/", getUsuarioEmpresas);
//GET ID
router.get("/:id", getUsuarioEmpresa);
//UPDATE
router.patch("/:id",updateUsuarioEmpresa);
//DELETE
router.delete("/:id",deleteUsuarioEmpresa);

export default router;