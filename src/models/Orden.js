const { DataTypes } = require("sequelize");
const sequelize = require("../utils/connection");

const Orden = sequelize.define("orden", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  fecha: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  register: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
    defaultValue: false,
  },
  numOrden: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  contrasena: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  santoSena: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  frase: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  jefeControl: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  urlOrden: {
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

module.exports = Orden;
