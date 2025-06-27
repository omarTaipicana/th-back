const { getAll, create, getOne, remove, update } = require('../controllers/order.controllers');
const express = require('express');

const ordenRouter = express.Router();

ordenRouter.route('/orden')
    .get(getAll)
    .post(create);

ordenRouter.route('/orden/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

module.exports = ordenRouter;