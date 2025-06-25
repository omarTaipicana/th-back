const { DataTypes } = require("sequelize");
const sequelize = require("../utils/connection");

const Variables = sequelize.define(
  "variables",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    departamento: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    seccion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nomenclatura: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cargo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    novedad: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    grado: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tipoLicencia: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    discapacidad: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    etnia: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    estadoCivil: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    sexo: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    figuraLegal: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    tipoDocumento: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    tipoContacto: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    genero: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    createdAt: false,
    updatedAt: false,
  }
);

module.exports = Variables;
