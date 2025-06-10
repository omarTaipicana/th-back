const { getAll, create, getOne, remove, update } = require('../controllers/partePdf.controllers');
const express = require('express');

const partePdfRouter = express.Router();

partePdfRouter.route('/parte_pdf')
    .get(getAll)
    .post(create);

partePdfRouter.route('/parte_pdf/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

module.exports = partePdfRouter;