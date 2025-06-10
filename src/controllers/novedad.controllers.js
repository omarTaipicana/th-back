const catchError = require("../utils/catchError");
const Novedad = require("../models/Novedad");

const getAll = catchError(async (req, res) => {
  const results = await Novedad.findAll();
  return res.json(results);
});

const create = catchError(async (req, res) => {
  const result = await Novedad.create(req.body);
  return res.status(201).json(result);
});

const getOne = catchError(async (req, res) => {
  const { id } = req.params;
  const result = await Novedad.findByPk(id);
  if (!result) return res.sendStatus(404);
  return res.json(result);
});

const remove = catchError(async (req, res) => {
  const { id } = req.params;
  const result = await Novedad.findByPk(id);
  await Novedad.destroy({ where: { id } });
  return res.json(result).sendStatus(204);
});

const update = catchError(async (req, res) => {
  const { id } = req.params;
  const result = await Novedad.update(req.body, {
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
