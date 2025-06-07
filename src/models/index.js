const User = require("./User");
const EmailCode = require("./EmailCode");
const Novedad = require("./Novedad");
const ServidorPolicial = require("./ServidorPolicial");

EmailCode.belongsTo(User);
User.hasOne(EmailCode);


Novedad.belongsTo(ServidorPolicial )
ServidorPolicial  .hasMany(Novedad)
