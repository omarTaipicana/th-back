const { getAll, create, getOne, remove, update } = require('../controllers/novedad.controllers');
const express = require('express');
const upload = require("../utils/multer")


const novedadRouter = express.Router();

novedadRouter.route('/novedades')
    .get(getAll)
    .post(upload.uploadN.single("file"), upload.generateFileUrlN, create);

novedadRouter.route('/novedades/:id')
    .get(getOne)
    .delete(remove)
    .put(upload.uploadN.single("file"), upload.generateFileUrlN, update);

module.exports = novedadRouter;