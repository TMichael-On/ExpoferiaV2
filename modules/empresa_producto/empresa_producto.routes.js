import { Router } from "express";
import {
  createEmpresaProducto,
  deleteEmpresaProducto,
  getEmpresaProducto,
  getEmpresaProductos,
  getEmpresaProductosId,
  prueba,
  updateEmpresaProducto,
  view,
} from "./empresa_producto.controller.js";
import { isAuth } from "../../middleware/auth.middleware.js"

const router = Router();
//CREATE
router.post("/create", isAuth, createEmpresaProducto);
//GET GENERAL
router.get("/list", getEmpresaProductos);
//GET GENERAL ID
router.get("/list/:id", getEmpresaProductosId);
//GET ID
router.get("/:id", getEmpresaProducto);
//UPDATE
router.patch("/:id", updateEmpresaProducto);
//DELETE
router.delete("/:id", deleteEmpresaProducto);
//VIEW
router.get("/", view);

//PRUEBA
router.get("/prueba", prueba);

export default router;
