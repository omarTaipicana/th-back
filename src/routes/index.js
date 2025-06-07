const express = require('express');
const userRouter = require('./user.router');
const senpladesRouter = require('./senplades.router');
const variablesRouter = require('./variables.router');
const servidorPolicialRouter = require('./servidorPolicial.router');
const novedadRouter = require('./novedad.router');
const router = express.Router();

// colocar las rutas aquí
router.use(userRouter)
router.use(senpladesRouter)
router.use(variablesRouter)
router.use(servidorPolicialRouter)
router.use(novedadRouter)

module.exports = router;