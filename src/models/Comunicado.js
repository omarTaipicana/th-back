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
