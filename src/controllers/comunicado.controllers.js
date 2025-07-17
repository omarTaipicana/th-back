const catchError = require("../utils/catchError");
const Comunicado = require("../models/Comunicado");
const path = require("path");
const fs = require("fs");

const getAll = catchError(async (req, res) => {
  const results = await Comunicado.findAll();
  return res.json(results);
});

const create = catchError(async (req, res) => {
  const url = req.fileUrl;
  const result = await Comunicado.create({
    ...req.body,
    urlFile: url,
  });
  
  return res.status(201).json(result);
});

const getOne = catchError(async (req, res) => {
  const { id } = req.params;
  const result = await Comunicado.findByPk(id);
  if (!result) return res.sendStatus(404);
  return res.json(result);
});

const remove = catchError(async (req, res) => {
  const { id } = req.params;
  const result = await Comunicado.findByPk(id);
  if (!result) return res.status(400).json({ message: "No existe el ID" });
  if (result.urlFile) {
    const docPath = path.join(
      __dirname,
      "..",
      "..",
      "uploads",
      "comunicados",
      path.basename(result.urlFile)
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

  const existingRecord = await Comunicado.findByPk(id);

  if (!existingRecord) {
    return res.status(404).json({ message: "Registro no encontrado" });
  }

  if (url && existingRecord.urlFile) {
    const imagePath = path.join(
      __dirname,
      "..",
      "..",
      "uploads",
      "comunicados",
      path.basename(existingRecord.urlFile)
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

  const [updateCount, updatedRecords] = await Comunicado.update(
    {
      ...req.body,
      urlFile: url || existingRecord.url, // Mantén el valor anterior si no hay nuevo archivo
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
