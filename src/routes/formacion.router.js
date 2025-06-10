const { getAll, create, getOne, remove, update } = require('../controllers/formacion.controllers');
const express = require('express');

const formacionRouter = express.Router();

formacionRouter.route('/formacion')
    .get(getAll)
    .post(create);

formacionRouter.route('/formacion/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

module.exports = formacionRouter;