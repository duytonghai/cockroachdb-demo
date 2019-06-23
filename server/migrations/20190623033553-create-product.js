'use strict';

const Sequelize = require('sequelize-cockroachdb');

const dbConfig = require('../config/config');

// Define the Products model for the "products" table.
var Products = dbConfig.define('products', {
  id: {
    allowNull: false,
    autoIncrement: false,
    primaryKey: true,
    type: Sequelize.STRING
  },
  name: {
    allowNull: false,
    type: Sequelize.STRING
  },
  category_id: {
    allowNull: false,
    type: Sequelize.STRING,
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

// Create the "products" table.
Products.sync({force: true}).then(function() {
  // Insert 9 rows into the "products" table.
  return Products.bulkCreate([
    {id: "02140848-9859-4402-af8b-31533410d488", name: "Flour - Teff", category_id: "c1eaf672-0908-4da2-aa32-2118980a510e", quantity: 77},
    {id: "1525da21-6b2e-437f-a8bd-33851b796ce1", name: "Lid Coffee Cup 8oz Blk", category_id: "c1eaf672-0908-4da2-aa32-2118980a510e", quantity: 21},
    {id: "34427c20-4580-4e04-8ee9-c8320f3ceb35", name: "Cake - Bande Of Fruit", category_id: "c1eaf672-0908-4da2-aa32-2118980a510e", quantity: 88},
    {id: "3a24850f-cd5f-4163-b81d-d8e7389ab2ba", name: "Dawn Professionl Pot And Pan", category_id: "c70a5d6b-bc58-4b5f-b7b6-476eb2afbec3", quantity: 64},
    {id: "7d74b7ae-932e-49df-a409-63921ba05514", name: "Cattail Hearts", category_id: "c70a5d6b-bc58-4b5f-b7b6-476eb2afbec3", quantity: 50},
    {id: "85ede6e2-91ab-4030-91a7-0247f02b5f86", name: "Pork - Backfat", category_id: "c70a5d6b-bc58-4b5f-b7b6-476eb2afbec3", quantity: 42},
    {id: "bafa7a3f-a691-4879-a909-7565d60e3623", name: "Soup - Campbells Beef Strogonoff", category_id: "c70a5d6b-bc58-4b5f-b7b6-476eb2afbec3", quantity: 34},
    {id: "db3e5cb9-df39-4294-a676-adba0aaede4e", name: "Bar Nature Valley", category_id: "dd6db3a7-bdbf-4419-a615-2ff2053c8be0", quantity: 48},
    {id: "f1014f83-59df-4970-9cc4-ec5a81cfa65e", name: "Bananas", category_id: "dd6db3a7-bdbf-4419-a615-2ff2053c8be0", quantity: 100}
  ]);
}).then(function() {
  // Retrieve products.
  return Products.findAll();
}).then((products) => {
  // Print out the balances.
  products.forEach(function(product) {
    console.log(product.id + ' ' + product.name + ' ' + product.quantity);
  });
  process.exit(0);
}).catch(function(err) {
  console.error('error: ' + err.message);
  process.exit(1);
});
