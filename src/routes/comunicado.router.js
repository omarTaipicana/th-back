const { getAll, create, getOne, remove, update } = require('../controllers/comunicado.controllers');
const express = require('express');

const comunicadoRouter = express.Router();

comunicadoRouter.route('/comunicados')
    .get(getAll)
    .post(create);

comunicadoRouter.route('/comunicados/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

module.exports = comunicadoRouter;