var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var cors = require('cors');
var logger = require('morgan');

require("@babel/register")({
  presets: ["@babel/preset-env"]
});

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productsRouter = require('./routes/products');
var ordersRouter = require('./routes/orders');

var app = express();
const PORT = process.env.PORT || 3000

app.use(cors({origin: '*'}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/orders', ordersRouter);

// For debug
//app.listen(PORT, () => console.log(`App listening on *:${PORT}`))

module.exports = app;
