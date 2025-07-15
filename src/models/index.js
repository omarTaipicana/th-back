const User = require("./User");
const EmailCode = require("./EmailCode");
const Novedad = require("./Novedad");
const ServidorPolicial = require("./ServidorPolicial");
const ParteDiario = require("./ParteDiario");
const Formacion = require("./Formacion");
const PartePdf = require("./PartePdf");
const Orden = require("./Orden");
const Turno = require("./Turno");
const Comunicado = require("./Comunicado");

EmailCode.belongsTo(User);
User.hasOne(EmailCode);

Novedad.belongsTo(ServidorPolicial);
ServidorPolicial.hasMany(Novedad);

ParteDiario.belongsTo(ServidorPolicial);
ServidorPolicial.hasMany(ParteDiario);

ParteDiario.belongsTo(Formacion);
Formacion.hasMany(ParteDiario);

PartePdf.belongsTo(Formacion);
Formacion.hasMany(PartePdf);

Orden.belongsTo(Formacion);
Formacion.hasMany(Orden);



ServidorPolicial.belongsToMany(Orden, {
  through: Turno, // Define Turno como tabla pivote
  foreignKey: "ServidorPolicialId", // FK en Turno hacia ServidorPolicial
  otherKey: "OrdenId", // FK en Turno hacia Orden
});

Orden.belongsToMany(ServidorPolicial, {
  through: Turno, // Define Turno como tabla pivote
  foreignKey: "OrdenId", // FK en Turno hacia Orden
  otherKey: "ServidorPolicialId", // FK en Turno hacia ServidorPolicial
});
