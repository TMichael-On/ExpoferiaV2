import { Router } from "express";
import { register } from "./auth.controller.js";

const router = Router();
//CREATE
router.post("/register", register);
//VIEW
// router.get("/", view);

export default router;