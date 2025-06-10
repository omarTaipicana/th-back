const { DataTypes } = require("sequelize");
const sequelize = require("../utils/connection");

const ServidorPolicial = sequelize.define("servidorPolicial", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  cI: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  grado: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nombres: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  apellidos: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fechaNacimiento: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  fechaIngreso: {
    type: DataTypes.DATEONLY,
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
  etnia: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  correoElectronico: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  celular: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  provinciaResidencia: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cantonResidencia: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  direccionResidencia: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  contactoEmergencia: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  numeroContactoEmergencia: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  parentesco: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  alertaDiscapacidad: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  detalleDiscapacidad: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  alertaEnfermedadCatastrofica: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  detalleEnfermedad: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  grupoAdmin: {
    type: DataTypes.STRING,
    allowNull: false,
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
  paseDNATH: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fechaPresentacion: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  figuraLegal: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  numDocumento: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  enLaDireccion: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  eliminado: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: "NO",
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

module.exports = ServidorPolicial;
