const catchError = require("../utils/catchError");
const ServidorPolicial = require("../models/ServidorPolicial");
const Novedad = require("../models/Novedad");

const getAll = catchError(async (req, res) => {
  const results = await ServidorPolicial.findAll({
    include: [Novedad],
  });
  return res.json(results);
});

const create = catchError(async (req, res) => {
  const result = await ServidorPolicial.create(req.body);
  return res.status(201).json(result);
});

const getOne = catchError(async (req, res) => {
  const { id } = req.params;
  const result = await ServidorPolicial.findByPk(id);
  if (!result) return res.sendStatus(404);
  return res.json(result);
});

const remove = catchError(async (req, res) => {
  const { id } = req.params;
  const result = await ServidorPolicial.findByPk(id);
  await ServidorPolicial.destroy({ where: { id } });
  return res.json(result).sendStatus(204);
});

const update = catchError(async (req, res) => {
  const { id } = req.params;
  const result = await ServidorPolicial.update(req.body, {
    where: { id },
    returning: true,
  });
  if (result[0] === 0) return res.sendStatus(404);
  return res.json(result[1][0]);
});

module.exports = {
  getAll,
  create,
  getOne,
  remove,
  update,
};
