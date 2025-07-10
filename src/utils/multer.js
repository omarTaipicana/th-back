const multer = require("multer");
const path = require("path");
const fs = require("fs");
const express = require("express");

// Define la ruta fuera de la carpeta raíz del proyecto
const uploadPathPd = path.join(
  __dirname,
  "..",
  "..",
  "uploads",
  "parte_diario"
);
const uploadPathN = path.join(__dirname, "..", "..", "uploads", "novedades");
const uploadPathO = path.join(__dirname, "..", "..", "uploads", "ordenes");
const uploadPathSp = path.join(__dirname, "..", "..", "uploads", "serv_poli");

// Crea la carpeta si no existe
if (!fs.existsSync(uploadPathPd)) {
  fs.mkdirSync(uploadPathPd, { recursive: true });
}

if (!fs.existsSync(uploadPathN)) {
  fs.mkdirSync(uploadPathN, { recursive: true });
}

if (!fs.existsSync(uploadPathO)) {
  fs.mkdirSync(uploadPathO, { recursive: true });
}

if (!fs.existsSync(uploadPathSp)) {
  fs.mkdirSync(uploadPathSp, { recursive: true });
}

// Configuración de Multer
const uploadPd = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadPathPd); // Configura la carpeta de destino
    },
    filename: (req, file, cb) => {
      const timestamp = new Date()
        .toISOString()
        .replace(/[-:.]/g, "") // Quita caracteres conflictivos
        .slice(0, 15); // YYYYMMDDTHHMMSS

      const ext = path.extname(file.originalname); // .pdf, .png, etc.
      const baseName = path
        .basename(file.originalname, ext)
        .replace(/\s+/g, "_"); // quita espacios

      const uniqueName = `${baseName}_${timestamp}${ext}`;
      cb(null, uniqueName);
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

const uploadN = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadPathN); // Configura la carpeta de destino
    },
    filename: (req, file, cb) => {
      const timestamp = new Date()
        .toISOString()
        .replace(/[-:.]/g, "") // Quita caracteres conflictivos
        .slice(0, 15); // YYYYMMDDTHHMMSS

      const ext = path.extname(file.originalname); // .pdf, .png, etc.
      const baseName = path
        .basename(file.originalname, ext)
        .replace(/\s+/g, "_"); // quita espacios

      const uniqueName = `${baseName}_${timestamp}${ext}`;
      cb(null, uniqueName);
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

const uploadO = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadPathO); // Configura la carpeta de destino
    },
    filename: (req, file, cb) => {
      const timestamp = new Date()
        .toISOString()
        .replace(/[-:.]/g, "") // Quita caracteres conflictivos
        .slice(0, 15); // YYYYMMDDTHHMMSS

      const ext = path.extname(file.originalname); // .pdf, .png, etc.
      const baseName = path
        .basename(file.originalname, ext)
        .replace(/\s+/g, "_"); // quita espacios

      const uniqueName = `${baseName}_${timestamp}${ext}`;
      cb(null, uniqueName);
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

const uploadSp = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadPathSp); // Configura la carpeta de destino
    },
    filename: (req, file, cb) => {
      const timestamp = new Date()
        .toISOString()
        .replace(/[-:.]/g, "") // Quita caracteres conflictivos
        .slice(0, 15); // YYYYMMDDTHHMMSS

      const ext = path.extname(file.originalname); // .pdf, .png, etc.
      const baseName = path
        .basename(file.originalname, ext)
        .replace(/\s+/g, "_"); // quita espacios

      const uniqueName = `${baseName}_${timestamp}${ext}`;
      cb(null, uniqueName);
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
const generateFileUrlPd = (req, res, next) => {
  if (req.file) {
    const host = `${req.protocol}://${req.get("host")}`; // Ej: http://localhost:8080
    const filePath = path.join("uploads", "parte_diario", req.file.filename); // Usa el nombre real guardado
    req.fileUrl = `${host}/${filePath.replace(/\\/g, "/")}`; // Normaliza las barras
  }
  next();
};

const generateFileUrlN = (req, res, next) => {
  if (req.file) {
    const host = `${req.protocol}://${req.get("host")}`; // Ej: http://localhost:8080
    const filePath = path.join("uploads", "novedades", req.file.filename); // Usa el nombre real guardado
    req.fileUrl = `${host}/${filePath.replace(/\\/g, "/")}`; // Normaliza las barras
  }
  next();
};

const generateFileUrlO = (req, res, next) => {
  if (req.file) {
    const host = `${req.protocol}://${req.get("host")}`; // Ej: http://localhost:8080
    const filePath = path.join("uploads", "ordenes", req.file.filename); // Usa el nombre real guardado
    req.fileUrl = `${host}/${filePath.replace(/\\/g, "/")}`; // Normaliza las barras
  }
  next();
};

const generateFileUrlSp = (req, res, next) => {
  if (req.file) {
    const host = `${req.protocol}://${req.get("host")}`; // Ej: http://localhost:8080
    const filePath = path.join("uploads", "serv_poli", req.file.filename); // Usa el nombre real guardado
    req.fileUrl = `${host}/${filePath.replace(/\\/g, "/")}`; // Normaliza las barras
  }
  next();
};

// Configura la aplicación Express para servir la carpeta `uploads` de manera estática
const app = express();

// Ruta estática para archivos
app.use(
  "/uploads",
  express.static(path.join(__dirname, "..", "..", "uploads"))
);

module.exports = {
  uploadPd,
  generateFileUrlPd,
  uploadN,
  generateFileUrlN,
  uploadO,
  generateFileUrlO,
  uploadSp,
  generateFileUrlSp,
};
