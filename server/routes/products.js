var express = require('express');
var router = express.Router();

/* GET products listing. */
router.get('/', function(req, res, next) {
  res.json([
    {id: '1', name: 'Dawn Professionl Pot And Pan'},
    {id: '2', name: 'Cake - Bande Of Fruit'}
  ]);
});

module.exports = router;
