import { Router } from "express";
import { register, login, view } from "./auth.controller.js";

const router = Router();
//register
router.post("/register", register);

//login
router.post("/login", login);

//VIEW
router.get("/", view);

export default router;