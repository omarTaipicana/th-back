const { getAll, create, getOne, remove, update } = require('../controllers/servidorPolicial.controllers');
const express = require('express');
const upload = require("../utils/multer")


const servidorPolicialRouter = express.Router();

servidorPolicialRouter.route('/servidores')
    .get(getAll)
    .post(upload.uploadSp.single("file"), upload.generateFileUrlSp, create);

servidorPolicialRouter.route('/servidores/:id')
    .get(getOne)
    .delete(remove)
    .put(upload.uploadSp.single("file"), upload.generateFileUrlSp, update);

module.exports = servidorPolicialRouter;