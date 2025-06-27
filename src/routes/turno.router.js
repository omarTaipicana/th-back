const { getAll, create, getOne, remove, update } = require('../controllers/turno.controllers');
const express = require('express');

const turnoRouter = express.Router();

turnoRouter.route('/turno')
    .get(getAll)
    .post(create);

turnoRouter.route('/turno/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

module.exports = turnoRouter;