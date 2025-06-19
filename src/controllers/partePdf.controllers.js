const catchError = require("../utils/catchError");
const path = require("path");
const fs = require("fs");
const PartePdf = require("../models/PartePdf");
const Formacion = require("../models/Formacion");

const getAll = catchError(async (req, res) => {
  const results = await PartePdf.findAll({
    include: [Formacion],
  });
  return res.json(results);
});

const create = catchError(async (req, res) => {
  const result = await PartePdf.create(req.body);
  return res.status(201).json(result);
});

const getOne = catchError(async (req, res) => {
  const { id } = req.params;
  const result = await PartePdf.findByPk(id);
  if (!result) return res.sendStatus(404);
  return res.json(result);
});

const remove = catchError(async (req, res) => {
  const { id } = req.params;
  const pdfReg = await PartePdf.findByPk(id);
  if (!pdfReg) return res.status(400).json({ message: "No existe el ID" });

  if (pdfReg.pdf) {
    const imagePath = path.join(
      __dirname,
      "..",
      "..",
      "uploads",
      "parte_diario",
      path.basename(pdfReg.pdf)
    );

    fs.unlink(imagePath, (err) => {
      if (err) {
        console.error("Error al eliminar el archivo:", err);
        return res
          .status(500)
          .json({ message: "Error al eliminar el archivo" });
      }
    });
  }
  await pdfReg.destroy();
  return res.sendStatus(204);
});

const update = catchError(async (req, res) => {
  const { id } = req.params;
  const url = req.fileUrl;

  if (!req.file)
    return res.status(400).json({ message: "debes subir un archivo" });

  const existingRecord = await PartePdf.findByPk(id);

  if (!existingRecord) {
    return res.status(404).json({ message: "Registro no encontrado" });
  }

  if (existingRecord.pdf) {
    const imagePath = path.join(
      __dirname,
      "..",
      "..",
      "uploads",
      "parte_diario",
      path.basename(existingRecord.pdf)
    );

    fs.unlink(imagePath, (err) => {
      if (err) {
        console.error("Error al eliminar el archivo:", err);
        return res
          .status(500)
          .json({ message: "Error al eliminar el archivo" });
      }
    });
  }

  const result = await PartePdf.update(
    { pdf: url },
    {
      where: { id },
      returning: true,
    }
  );

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
