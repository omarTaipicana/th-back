const { DataTypes } = require("sequelize");
const sequelize = require("../utils/connection");

const Novedad = sequelize.define("novedad", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  novedad: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descripcion: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tipoDocumento: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  numDocumento: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fechaDocumento: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  fechaInicio: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  fechaFin: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  horaInicio: {
    type: DataTypes.TIME,
    allowNull: true,
  },
  horaFin: {
    type: DataTypes.TIME,
    allowNull: true,
  },

  seccion: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  urlDoc: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  usuarioRegistro: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  usuarioEdicion: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Novedad;
