const { getAll, create, getOne, remove, update } = require('../controllers/novedad.controllers');
const express = require('express');

const novedadRouter = express.Router();

novedadRouter.route('/novedades')
    .get(getAll)
    .post(create);

novedadRouter.route('/novedades/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

module.exports = novedadRouter;