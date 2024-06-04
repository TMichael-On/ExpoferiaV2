import { Router } from "express";
import {
  createEmpresaRedes,
  deleteEmpresaRedes,
  getEmpresaRedes,
  getEmpresasRedes,
  getEmpresasRedesId,
  prueba,
  updateEmpresaRedes,
  view,
} from "./empresa_redes.controller.js";

const router = Router();
//CREATE
router.post("/create", createEmpresaRedes);
//GET GENERAL
router.get("/list", getEmpresasRedes);
//GET GENERAL ID
router.get("/list/:id", getEmpresasRedesId);
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
