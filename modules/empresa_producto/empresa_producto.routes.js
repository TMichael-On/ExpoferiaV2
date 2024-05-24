import { Router } from "express";
import {
    createEmpresaProducto,
    deleteEmpresaProducto,
    getEmpresaProducto,
    getEmpresaProductos,
    prueba,
    updateEmpresaProducto,
    view
} from "./empresa_producto.controller.js";

const router = Router();
//CREATE
router.post("/create", createEmpresaProducto);
//GET GENERAL
router.get("/list", getEmpresaProductos);
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