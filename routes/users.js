/*jshint esversion: 6 */

var express = require('express');
var auth = require('../modules/auth');
var router = express.Router();

router.get('/', auth.verifyToken, function (req, res, next) {
  db.query('SELECT * from users', function (error, results, fields) {
    res.send(results);
  });
});

module.exports = router;
