var express = require('express');
var auth = require('../modules/auth')
var router = express.Router();

router.get('/', auth.verifyToken, function (req, res, next) {
  db.query('SELECT * from Users', function (error, results, fields) {
    res.send(results);
  });
});

module.exports = router;
