require('dotenv').config();
const Sequelize = require('sequelize-cockroachdb');

module.exports = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  dialect: 'postgres',
  port: process.env.DB_PORT,
  logging: false
})
