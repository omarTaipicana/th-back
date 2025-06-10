const { getAll, create, getOne, remove, update } = require('../controllers/parteDiario.controllers');
const express = require('express');

const parteDiarioRouter = express.Router();

parteDiarioRouter.route('/parte_diario')
    .get(getAll)
    .post(create);

parteDiarioRouter.route('/parte_diario/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

module.exports = parteDiarioRouter;