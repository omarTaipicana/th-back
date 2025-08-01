const { DataTypes } = require("sequelize");
const sequelize = require("../utils/connection");

const Comunicado = sequelize.define("comunicado", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  comunicado: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  fechaInicio: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  fechaFin: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  urlFile: {
    type: DataTypes.STRING,
    allowNull: false,
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

module.exports = Comunicado;
