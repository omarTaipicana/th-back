const multer = require("multer");
const path = require("path");
const fs = require("fs");
const express = require("express");

// Define la ruta fuera de la carpeta raíz del proyecto
const uploadPath = path.join(__dirname, "..", "..", "uploads", "parte_diario");

// Crea la carpeta si no existe
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

// Configuración de Multer
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadPath); // Configura la carpeta de destino
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname); // Guarda el archivo con su nombre original
    },
  }),
  limits: {
    fileSize: 10 * 1024 * 1024, // Tamaño máximo de archivo: 10 MB
  },
  fileFilter: (req, file, cb) => {
    // Valida el tipo de archivo permitido
    const allowedMimeTypes = [
      "application/pdf",
      "image/jpeg",
      "image/png",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // .xlsx
      "application/vnd.ms-excel", // .xls
    ];
    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Solo se permiten archivos PDF, JPEG o PNG"));
    }
  },
});

// Middleware para generar la URL del archivo
const generateFileUrl = (req, res, next) => {
  if (req.file) {
    const host = `${req.protocol}://${req.get("host")}`; // Obtiene el host del servidor
    const filePath = path.join(
      "uploads",
      "parte_diario",
      req.file.originalname
    );
    req.fileUrl = `${host}/${filePath.replace(/\\/g, "/")}`; // Genera la URL
  }
  next();
};

// Configura la aplicación Express para servir la carpeta `uploads` de manera estática
const app = express();

// Ruta estática para archivos
app.use(
  "/uploads",
  express.static(path.join(__dirname, "..", "..", "uploads", "parte_diario"))
);

module.exports = { upload, generateFileUrl };
