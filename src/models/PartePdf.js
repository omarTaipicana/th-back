const { DataTypes } = require("sequelize");
const sequelize = require("../utils/connection");

const PartePdf = sequelize.define("partePdf", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  seccion: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  pdf: {
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

module.exports = PartePdf;
