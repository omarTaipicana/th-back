const catchError = require("../utils/catchError");
const path = require("path");
const fs = require("fs");
const Orden = require("../models/Orden");

const getAll = catchError(async (req, res) => {
  const results = await Orden.findAll();
  return res.json(results);
});

const create = catchError(async (req, res) => {
  const {
    fecha,
    register,
    numOrden,
    contrasena,
    santoSena,
    frase,
    jefeControl,
    usuarioRegistro,
    usuarioEdicion,
  } = req.body;

  const url = req.fileUrl;

  const result = await Orden.create({
    fecha,
    register,
    numOrden,
    contrasena,
    santoSena,
    frase,
    jefeControl,
    urlOrden: url,
    usuarioRegistro,
    usuarioEdicion,
  });
  return res.status(201).json(result);
});

const getOne = catchError(async (req, res) => {
  const { id } = req.params;
  const result = await Orden.findByPk(id);
  if (!result) return res.sendStatus(404);
  return res.json(result);
});

const remove = catchError(async (req, res) => {
  const { id } = req.params;
  const result = await Orden.findByPk(id);
  if (!result) return res.status(400).json({ message: "No existe el ID" });

  if (result.urlOrden) {
    const docPath = path.join(
      __dirname,
      "..",
      "..",
      "uploads",
      "ordenes",
      path.basename(result.urlOrden)
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
  return res.status(200).json({ orden: result.numOrden });
});

const update = catchError(async (req, res) => {
  const { id } = req.params;
  const url = req.fileUrl;
  const {
    fecha,
    register,
    numOrden,
    contrasena,
    santoSena,
    frase,
    jefeControl,
    usuarioRegistro,
    usuarioEdicion,
  } = req.body;

  const existingRecord = await Orden.findByPk(id);

  if (!existingRecord) {
    return res.status(404).json({ message: "Registro no encontrado" });
  }

  if (url && existingRecord.urlOrden) {
    const imagePath = path.join(
      __dirname,
      "..",
      "..",
      "uploads",
      "ordenes",
      path.basename(existingRecord.urlOrden)
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

  const [updateCount, updatedRecords] = await Orden.update(
    {
      fecha,
      register,
      numOrden,
      contrasena,
      santoSena,
      frase,
      jefeControl,
      usuarioRegistro,
      usuarioEdicion,
      urlOrden: url || existingRecord.urlOrden, // Actualiza solo si hay un nuevo archivo
    },
    {
      where: { id },
      returning: true, // Devuelve el registro actualizado
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
