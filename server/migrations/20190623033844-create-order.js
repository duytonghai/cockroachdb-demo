'use strict';

const uuidv4 = require('uuid/v4');
const Sequelize = require('sequelize-cockroachdb');

const dbConfig = require('../config/config');

// Define the Orders model for the "orders" table.
var Orders = dbConfig.define('orders', {
  id: {
    allowNull: false,
    autoIncrement: false,
    primaryKey: true,
    type: Sequelize.STRING
  },
  user_id: {
    allowNull: false,
    type: Sequelize.STRING
  },
  product_id: {
    allowNull: false,
    type: Sequelize.STRING
  },
  quantity: {
    allowNull: false,
    type: Sequelize.INTEGER
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

// Create the "orders" table.
Orders.sync({force: true}).then(function() {
  // Insert 3 rows into the "orders" table.
  return Orders.bulkCreate([
    {id: uuidv4(), product_id: "02140848-9859-4402-af8b-31533410d488", user_id: "0e06a1be-7ec0-4d3c-8f32-b2a9bee62a4a", quantity: 1}
  ]);
}).then(function() {
  // Retrieve orders.
  return Orders.findAll();
}).then((orders) => {
  // Print out the orders.
  orders.forEach(function(order) {
    const { id, user_id, product_id, quantity } = order;
    console.log(`${id} ${user_id} ${product_id} ${quantity}`);
  });
  process.exit(0);
}).catch(function(err) {
  console.error('error: ' + err.message);
  process.exit(1);
});
