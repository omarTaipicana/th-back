const User = require("./User");
const EmailCode = require("./EmailCode");
const Novedad = require("./Novedad");
const ServidorPolicial = require("./ServidorPolicial");
const ParteDiario = require("./ParteDiario");
const Formacion = require("./Formacion");
const PartePdf = require("./PartePdf");

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
