const express = require("express");
const userRouter = require("./user.router");
const senpladesRouter = require("./senplades.router");
const variablesRouter = require("./variables.router");
const servidorPolicialRouter = require("./servidorPolicial.router");
const novedadRouter = require("./novedad.router");
const formacionRouter = require("./formacion.router");
const parteDiarioRouter = require("./parteDiario.router");
const partePdfRouter = require("./partePdf.router");
const ordenRouter = require("./orden.router");
const turnoRouter = require("./turno.router");
const comunicadoRouter = require("./comunicado.router");
const router = express.Router();

// colocar las rutas aquí
router.use(userRouter);
router.use(senpladesRouter);
router.use(variablesRouter);
router.use(servidorPolicialRouter);
router.use(novedadRouter);
router.use(formacionRouter);
router.use(parteDiarioRouter);
router.use(partePdfRouter);
router.use(ordenRouter);
router.use(turnoRouter);
router.use(comunicadoRouter);

module.exports = router;
