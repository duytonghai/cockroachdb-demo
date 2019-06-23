const Sequelize = require('sequelize-cockroachdb');

const dbConfig = require('../config/config');

// Define the Categories model for the "categories" table.
var Categories = dbConfig.define('categories', {
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
  createdAt: {
    allowNull: false,
    type: Sequelize.DATE
  },
  updatedAt: {
    allowNull: false,
    type: Sequelize.DATE
  }
});

// Create the "categories" table.
Categories.sync({force: true}).then(function() {
  // Insert 3 rows into the "categories" table.
  return Categories.bulkCreate([
    {id: "c1eaf672-0908-4da2-aa32-2118980a510e", name: "Electronics, Computers & Office"},
    {id: "c70a5d6b-bc58-4b5f-b7b6-476eb2afbec3", name: "Books & Audible"},
    {id: "dd6db3a7-bdbf-4419-a615-2ff2053c8be0", name: "Home, Garden & Tools"}
  ]);
}).then(function() {
  // Retrieve categories.
  return Categories.findAll();
}).then((categories) => {
  // Print out the balances.
  categories.forEach(function(category) {
    console.log(category.id + ' ' + category.name);
  });
  process.exit(0);
}).catch(function(err) {
  console.error('error: ' + err.message);
  process.exit(1);
});
