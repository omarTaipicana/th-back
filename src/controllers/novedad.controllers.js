const catchError = require("../utils/catchError");
const path = require("path");
const fs = require("fs");
const Novedad = require("../models/Novedad");

const getAll = catchError(async (req, res) => {
  const results = await Novedad.findAll();
  return res.json(results);
});

const create = catchError(async (req, res) => {
  const {
    novedad,
    descripcion,
    tipoDocumento,
    numDocumento,
    fechaDocumento,
    fechaInicio,
    fechaFin,
    horaInicio,
    horaFin,
    seccion,
    servidorPolicialId,
    usuarioRegistro,
    usuarioEdicion,
  } = req.body;

  const url = req.fileUrl;

  const result = await Novedad.create({
    novedad,
    descripcion,
    tipoDocumento,
    numDocumento,
    fechaDocumento,
    fechaInicio,
    fechaFin,
    horaInicio,
    horaFin,
    seccion,
    urlDoc: url,
    servidorPolicialId,
    usuarioRegistro,
    usuarioEdicion,
  });
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
  if (!result) return res.status(400).json({ message: "No existe el ID" });

  if (result.urlDoc) {
    const docPath = path.join(
      __dirname,
      "..",
      "..",
      "uploads",
      "novedades",
      path.basename(result.urlDoc)
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
  const {
    novedad,
    descripcion,
    tipoDocumento,
    numDocumento,
    fechaDocumento,
    fechaInicio,
    fechaFin,
    horaInicio,
    horaFin,
    usuarioEdicion,
  } = req.body;

  // Busca el registro existente
  const existingRecord = await Novedad.findByPk(id);

  if (!existingRecord) {
    return res.status(404).json({ message: "Registro no encontrado" });
  }

  // Si hay una URL y existe un archivo previo
  if (url && existingRecord.urlDoc) {
    const imagePath = path.join(
      __dirname,
      "..",
      "..",
      "uploads",
      "novedades",
      path.basename(existingRecord.urlDoc)
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

  // Actualiza el registro con los nuevos datos
  const [updateCount, updatedRecords] = await Novedad.update(
    {
      novedad,
      descripcion,
      tipoDocumento,
      numDocumento,
      fechaDocumento,
      fechaInicio,
      fechaFin,
      horaInicio,
      horaFin,
      usuarioEdicion,
      urlDoc: url || existingRecord.urlDoc, // Actualiza solo si hay un nuevo archivo
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
