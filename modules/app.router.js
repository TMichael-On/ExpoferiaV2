import { Router } from "express";
import authentication from "./authentication/authentication.js";
import empresa from "./empresa/empresa.routes.js";
import empresa_colaborador from "./empresa_colaborador/empresa_colaborador.routes.js";
import empresa_producto from "./empresa_producto/empresa_producto.routes.js";
import empresa_redes from "./empresa_redes/empresa_redes.routes.js";
import usuario_empresa from "./usuario_empresa/usuario_empresa.routes.js";
// Importa las demás rutas aquí...

const router = Router();

router.use("/", authentication);
router.use("/empresa", empresa);
router.use("/empresa-colaborador", empresa_colaborador);
router.use("/empresa-producto", empresa_producto);
router.use("/empresa-redes", empresa_redes);
router.use("/usuario-empresa", usuario_empresa);

router.get("/prueba", (req, res) => {
    res.render('new/1')
})

export default router;