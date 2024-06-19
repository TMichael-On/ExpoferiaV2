import { Router } from "express";
import empresa from "./empresa/empresa.routes.js";
import empresa_colaborador from "./empresa_colaborador/empresa_colaborador.routes.js";
import empresa_producto from "./empresa_producto/empresa_producto.routes.js";
import empresa_redes from "./empresa_redes/empresa_redes.routes.js";
import usuario_empresa from "./usuario_empresa/usuario_empresa.routes.js";
import auth from "./authentication/auth.routes.js"
import  {isAuth} from "../middleware/auth.middleware.js"
// Importa las demás rutas aquí...

const router = Router();

// router.use("/", authentication);
router.use("/", auth);
router.use("/empresa", empresa);
router.use("/colaborador", empresa_colaborador);
router.use("/producto", empresa_producto);
router.use("/redes", empresa_redes);
router.use("/usuario", usuario_empresa);

router.get("/prueba", (req, res) => {
    res.render('new/1')
})

export default router;