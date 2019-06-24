var async = require('async');
var express = require('express');
var fs = require('fs');
var pg = require('pg');
var router = express.Router();

// Connect to the "dev2ta_demo" database.
var config = {
    user: process.env.DB_USERNAME || 'maxroach',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'dev2ta_demo',
    port: process.env.DB_PORT || 26257
};

// Create a pool.
var pool = new pg.Pool(config);

/* GET products listing. */
router.get('/', function(req, res, next) {
  pool.connect(function (err, client, done) {
    // Close communication with the database and exit.
    var finish = function () {
      done();
      //process.exit();
    };

    if (err) {
        console.error('could not connect to cockroachdb', err);
        finish();
    }
    async.waterfall([
      function (next) {
        client.query('SELECT id, name, category_id, quantity FROM products;', next);
      },
    ],
    function (err, results) {
      if (err) {
        console.error('Error selecting from products: ', err);
        finish();
      }

      res.json(results.rows);

      finish();
    });
  });
});

module.exports = router;
