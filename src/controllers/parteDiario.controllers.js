const catchError = require('../utils/catchError');
const ParteDiario = require('../models/ParteDiario');

const getAll = catchError(async(req, res) => {
    const results = await ParteDiario.findAll();
    return res.json(results);
});

const create = catchError(async(req, res) => {
    const result = await ParteDiario.create(req.body);
    return res.status(201).json(result);
});

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await ParteDiario.findByPk(id);
    if(!result) return res.sendStatus(404);
    return res.json(result);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    await ParteDiario.destroy({ where: {id} });
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await ParteDiario.update(
        req.body,
        { where: {id}, returning: true }
    );
    if(result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
});

module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update
}