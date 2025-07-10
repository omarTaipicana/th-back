const catchError = require("../utils/catchError");
const ServidorPolicial = require("../models/ServidorPolicial");
const Novedad = require("../models/Novedad");
const path = require("path");
const fs = require("fs");

const getAll = catchError(async (req, res) => {
  const results = await ServidorPolicial.findAll({
    include: [Novedad],
  });
  return res.json(results);
});

const create = catchError(async (req, res) => {
  const url = req.fileUrl;

  const result = await ServidorPolicial.create({
    ...req.body,
    ur: url,
  });
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
  if (!result) return res.status(400).json({ message: "No existe el ID" });

  if (result.url) {
    const docPath = path.join(
      __dirname,
      "..",
      "..",
      "uploads",
      "serv_poli",
      path.basename(result.url)
    );

    fs.unlink(docPath, (err) => {
      if (err) {
        console.error("Error al eliminar el archivo:", err);
        return res
          .status(500)
          .json({ message: "Error al eliminar el archivo" });
      }
    });
  }

  await result.destroy();
  return res.json(result).sendStatus(204);
});

const update = catchError(async (req, res) => {
  const { id } = req.params;
  const url = req.fileUrl;

  const existingRecord = await ServidorPolicial.findByPk(id);

  if (!existingRecord) {
    return res.status(404).json({ message: "Registro no encontrado" });
  }

  if (url && existingRecord.url) {
    const imagePath = path.join(
      __dirname,
      "..",
      "..",
      "uploads",
      "serv_poli",
      path.basename(existingRecord.url)
    );

    // Intenta eliminar el archivo previo
    fs.unlink(imagePath, (err) => {
      if (err && err.code !== "ENOENT") {
        console.error("Error al eliminar el archivo:", err);
        return res
          .status(500)
          .json({ message: "Error al eliminar el archivo anterior" });
      }
    });
  }

  const [updateCount, updatedRecords] = await ServidorPolicial.update(
    {
      ...req.body,
      url: url || existingRecord.url, // Mantén el valor anterior si no hay nuevo archivo
    },
    {
      where: { id },
      returning: true,
    }
  );

  if (updateCount === 0) return res.sendStatus(404);

  return res.json(updatedRecords[0]);
});

module.exports = {
  getAll,
  create,
  getOne,
  remove,
  update,
};
