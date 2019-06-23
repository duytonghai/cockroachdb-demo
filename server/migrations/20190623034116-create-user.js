'use strict';

const md5 = require('md5');
const Sequelize = require('sequelize-cockroachdb');

const dbConfig = require('../config/config');

// Define the Users model for the "users" table.
var Users = dbConfig.define('users', {
  id: {
    allowNull: false,
    autoIncrement: false,
    primaryKey: true,
    type: Sequelize.STRING
  },
  first_name: {
    allowNull: false,
    type: Sequelize.STRING
  },
  last_name: {
    allowNull: false,
    type: Sequelize.STRING
  },
  email: {
    allowNull: false,
    type: Sequelize.STRING
  },
  pwd: {
    allowNull: false,
    type: Sequelize.STRING
  },
  gender: {
    allowNull: false,
    type: Sequelize.STRING
  },
  ip_address: {
    allowNull: false,
    type: Sequelize.STRING
  },
  timezone: {
    allowNull: false,
    type: Sequelize.STRING
  },
  createdAt: {
    allowNull: false,
    type: Sequelize.DATE
  },
  updatedAt: {
    allowNull: false,
    type: Sequelize.DATE
  }
});

// Create the "users" table.
Users.sync({force: true}).then(function() {
  // Insert 2 rows into the "users" table.
  return Users.bulkCreate([
    {id: "881f3f79-eaec-4322-9651-8e2b22003e2d", first_name: "Abby", last_name: "Docket", email: "test1@gmail.com", pwd: md5("123456"), gender: "Female", ip_address: "195.155.16.98", timezone: "America/New_York"},
    {id: "0e06a1be-7ec0-4d3c-8f32-b2a9bee62a4a", first_name: "Etheline", last_name: "Le Bru", email: "test2@gmail.com", pwd: md5("123456"), gender: "Female", ip_address: "159.100.6.72", timezone: "Asia/Bangkok"}
  ]);
}).then(function() {
  // Retrieve users.
  return Users.findAll();
}).then((users) => {
  // Print out the balances.
  users.forEach(function(user) {
    const { id, first_name, last_name, email, pwd } = user;
    console.log(`${id} ${first_name} ${last_name} ${email} ${pwd}`);
  });
  process.exit(0);
}).catch(function(err) {
  console.error('error: ' + err.message);
  process.exit(1);
});
