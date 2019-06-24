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

/* GET user */
router.get('/:userId', function(req, res, next) {
  var userId = req.params.userId;

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
        client.query('SELECT id, first_name, last_name, email, pwd, gender, ip_address, timezone FROM users WHERE users.id =\'' + userId + '\';', next);
      },
    ],
    function (err, results) {
      if (err) {
        console.error('Error selecting from users: ', err);
        finish();
      }

      res.json(results.rows);

      finish();
    });
  });
});


/* GET user's orders */
router.get('/:userId/orders', function(req, res, next) {
  var userId = req.params.userId;

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
        client.query('SELECT * FROM orders WHERE orders.user_id =\'' + userId + '\';', next);
      },
    ],
    function (err, results) {
      if (err) {
        console.error('Error selecting from orders: ', err);
        finish();
      }

      res.json(results.rows);

      finish();
    });
  });
});


module.exports = router;
