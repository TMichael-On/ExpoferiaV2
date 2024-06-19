import { Router } from "express";
import {
    createUsuarioEmpresa,
    deleteUsuarioEmpresa,
    getUsuarioEmpresa,
    getUsuarioEmpresaCorreo,
    getUsuarioEmpresas,
    updateUsuarioEmpresa,
    view
} from "./usuario_empresa.controller.js";
import  {isAuth} from "../../middleware/auth.middleware.js"

const router = Router();
//CREATE
router.post("/create", createUsuarioEmpresa);
//GET GENERAL
router.get("/list", getUsuarioEmpresas);
//GET ID
router.get("/:id", getUsuarioEmpresa);
//POST ID
router.post("/:correo", getUsuarioEmpresaCorreo);
//UPDATE
router.patch("/:id", updateUsuarioEmpresa);
//DELETE
router.delete("/:id", deleteUsuarioEmpresa);
//VIEW
router.get("/", view);

export default router;