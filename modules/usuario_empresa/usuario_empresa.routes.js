import { Router } from "express";
import {
    createUsuarioEmpresa,
    deleteUsuarioEmpresa,
    getUsuarioEmpresa,
    getUsuarioEmpresas,
    updateUsuarioEmpresa,
    view
} from "./usuario_empresa.controller.js";
import isLoggedIn from "../authentication/auth.js";

const router = Router();
//CREATE
router.post("/create", createUsuarioEmpresa);
//GET GENERAL
router.get("/list", getUsuarioEmpresas);
//GET ID
router.get("/:id", getUsuarioEmpresa);
//UPDATE
router.patch("/:id", updateUsuarioEmpresa);
//DELETE
router.delete("/:id", deleteUsuarioEmpresa);
//VIEW
router.get("/", view);

export default router;