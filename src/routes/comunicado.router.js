const { getAll, create, getOne, remove, update } = require('../controllers/comunicado.controllers');
const express = require('express');
const upload = require("../utils/multer")


const comunicadoRouter = express.Router();

comunicadoRouter.route('/comunicados')
    .get(getAll)
    .post(upload.uploadCom.single("file"), upload.generateFileUrlCom, create);

comunicadoRouter.route('/comunicados/:id')
    .get(getOne)
    .delete(remove)
    .put(upload.uploadCom.single("file"), upload.generateFileUrlCom,update);

module.exports = comunicadoRouter;