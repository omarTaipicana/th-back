const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(process.env.DATABASE_URL);

// const sequelize = new Sequelize("postgres://postgres:root@127.0.0.1:5432/th_digin", {
//   dialect: 'postgres',
//   logging: false,
// });

module.exports = sequelize;
