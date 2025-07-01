const { getAll, create, getOne, remove, update } = require('../controllers/order.controllers');
const express = require('express');
const upload = require("../utils/multer")


const ordenRouter = express.Router();

ordenRouter.route('/orden')
    .get(getAll)
    .post(upload.uploadO.single("file"), upload.generateFileUrlO, create);

ordenRouter.route('/orden/:id')
    .get(getOne)
    .delete(remove)
    .put(upload.uploadO.single("file"), upload.generateFileUrlO, update);

module.exports = ordenRouter;