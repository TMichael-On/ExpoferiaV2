import { Router } from "express";
import {
    createEmpresaProducto,
    deleteEmpresaProducto,
    getEmpresaProducto,
    getEmpresaProductos,
    prueba,
    updateEmpresaProducto
} from "./empresa_producto.controller.js";

const router = Router();
//CREATE
router.post("/create", createEmpresaProducto);
//GET GENERAL
router.get("", getEmpresaProductos);
//GET ID
router.get("/:id", getEmpresaProducto);
//UPDATE
router.patch("/:id", updateEmpresaProducto);
//DELETE
router.delete("/:id", deleteEmpresaProducto);

//PRUEBA
router.get("/prueba", prueba);

export default router;