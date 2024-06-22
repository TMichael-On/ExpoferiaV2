import { Router } from "express";
import empresa from "./empresa/empresa.routes.js";
import empresa_agenda from "./empresa_agenda/empresa_agenda.routes.js";
import empresa_visita from "./empresa_visita/empresa_visita.routes.js";
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
router.use("/agenda", empresa_agenda);
router.use("/visita", empresa_visita);

router.get("/principal", (req, res) => {
    res.render('otros/principal')
})

export default router;