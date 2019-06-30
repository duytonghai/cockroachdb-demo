const async = require('async');
const express = require('express');
const fs = require('fs');
const pg = require('pg');
const router = express.Router();
const uuidv4 = require('uuid/v4');
const Sequelize = require('sequelize-cockroachdb');

// Connect to the "dev2ta_demo" database.
var config = {
    user: process.env.DB_USERNAME || 'maxroach',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'dev2ta_demo',
    port: process.env.DB_PORT || 26257
};

// Wrapper for a transaction.  This automatically re-calls "op" with
// the client as an argument as long as the database server asks for
// the transaction to be retried.
function txnWrapper(client, op, next) {
  client.query('BEGIN; SAVEPOINT cockroach_restart', function (err) {
      if (err) {
          return next(err);
      }

      var released = false;

      async.doWhilst(function (done) {
        var handleError = function (err) {
            // If we got an error, see if it's a retryable one
            // and, if so, restart.
            if (err.code === '40001') {
                // Signal the database that we'll retry.
                return client.query('ROLLBACK TO SAVEPOINT cockroach_restart', done);
            }
            // A non-retryable error; break out of the
            // doWhilst with an error.
            return done(err);
        };

        // Attempt the work.
        op(client, function (err) {
            if (err) {
                return handleError(err);
            }
            var opResults = arguments;

            // If we reach this point, release and commit.
            client.query('RELEASE SAVEPOINT cockroach_restart;', function (err) {
                if (err) {
                    return handleError(err);
                }
                released = true;
                return done.apply(null, opResults);
            });
        });
      },
      function () {
          return !released;
      },
      function (err) {
          if (err) {
              client.query('ROLLBACK', function () {
                  next(err);
              });
          } else {
              var txnResults = arguments;
              client.query('COMMIT', function (err) {
                  if (err) {
                      return next(err);
                  } else {
                      return next.apply(null, txnResults);
                  }
              });
          }
      });
  });
}

function txnWrapperUsingPromise(client, op, next) {
  client.query('BEGIN; SAVEPOINT cockroach_restart', function (err) {
      if (err) {
          return next(err);
      }

      var released = false;

      var promise1 = new Promise(function(resolve, reject) {
        var handleError = function (err) {
          // If we got an error, see if it's a retryable one
          // and, if so, restart.
          if (err.code === '40001') {
              // Signal the database that we'll retry.
              return client.query('ROLLBACK TO SAVEPOINT cockroach_restart', reject);
          }
          // A non-retryable error; break out of the
          // doWhilst with an error.
          return reject(err);
        };

        // Attempt the work.
        op(client, function (err) {
          if (err) {
            return handleError(err);
          }
          var opResults = arguments;

          // If we reach this point, release and commit.
          client.query('RELEASE SAVEPOINT cockroach_restart;', function (err) {
            if (err) {
              return handleError(err);
            }
            released = true;
            return resolve(opResults);
          });
        });
      });

      promise1.then(function(value) {
        var txnResults = arguments;
        client.query('COMMIT', function (err) {
          if (err) {
            return next(err);
          } else {
            return next.apply(null, txnResults);
          }
        });
      }, function(e) {
        client.query('ROLLBACK', function () {
          return next(e);
        });
      });
  });
}

// The checkout transaction we will run
function checkout(client, user_id, product_id, qty, next) {
    // Check the current quantity.
    client.query('SELECT quantity FROM products WHERE id = $1;', [product_id], function (err, results) {
      const order_id = uuidv4();
      var datetime = new Date();  

      if (err) {
        return next(err);
      } else if (results.rows.length === 0) {
        return next(new Error('product not found in table'));
      }

      var acctQty = results.rows[0].quantity;
      if (acctQty >= qty) {
          // Perform the order.
          async.waterfall([
              function (next) {
                // Subtract qty from product.
                client.query('UPDATE products SET quantity = quantity - $1 WHERE id = $2;', [qty, product_id], next);
              },
              function (updateResult, next) {
                // Add order.
                client.query('INSERT INTO orders (id, user_id, product_id, quantity, "createdAt", "updatedAt") VALUES ($1, $2, $3, $4, $5, $6);', [order_id, user_id, product_id, qty, datetime, datetime], next);        
              },
              function (updateResult, next) {
                // Fetch account balances after updates.
                client.query('SELECT * FROM orders WHERE id = $1;', [order_id], function (err, selectResult) {
                  next(err, selectResult ? selectResult.rows : null);
                });
              }
          ], next);
        } else {
          next(new Error('insufficient quantity'));
        }
    });
}


// Create a pool.
var pool = new pg.Pool(config);

/* POST creating order. */
router.post('/', function(req, res) {
  var user_id = req.body.user_id;
  var product_id = req.body.product_id;
  var quantity = req.body.quantity;

  console.log('------------ POST DATA ----------------------');
  console.log('user_id: ', user_id);
  console.log('product_id: ', product_id);
  console.log('quantity: ', quantity);
  console.log('---------------------------------------------');

  if (!user_id || !product_id || !quantity) {
    res.status(400);
    res.json({
      'error': 'Please check your input data!'
    });
    return;
  }


  pool.connect(function (err, client, done) {
    // Closes communication with the database and exits.
    var finish = function () {
      done();
    };

    if (err) {
      console.error('could not connect to db', err);
      finish();
    }

    // Execute the transaction.
    txnWrapperUsingPromise(client,
      function (client, next) {
        checkout(client, user_id, product_id, quantity, next);
      },
      function (err, results) {
        if (err instanceof Error) {
          console.error('error performing transaction', err);

          res.status(400);
          res.json({
            'error': err.message
          });
        } else {
          res.status(200);
          res.json(err[1].shift());
        }

        finish();
      });
  });
});

module.exports = router;
