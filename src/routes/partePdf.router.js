const { getAll, create, getOne, remove, update } = require('../controllers/partePdf.controllers');
const express = require('express');
const upload = require("../utils/multer")


const partePdfRouter = express.Router();

partePdfRouter.route('/parte_pdf')
    .get(getAll)
    .post(create);

partePdfRouter.route('/parte_pdf/:id')
    .get(getOne)
    .delete(remove)
    .put(upload.uploadPd.single("file"), upload.generateFileUrlPd, update);

module.exports = partePdfRouter;