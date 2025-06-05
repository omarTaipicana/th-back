const { getAll, create, getOne, remove, update } = require('../controllers/servidorPolicial.controllers');
const express = require('express');

const servidorPolicialRouter = express.Router();

servidorPolicialRouter.route('/servidores')
    .get(getAll)
    .post(create);

servidorPolicialRouter.route('/servidores/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

module.exports = servidorPolicialRouter;