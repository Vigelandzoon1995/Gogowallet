var express = require('express');
var router = express.Router();

var mysql = require("mysql");

/*var connection = mysql.createConnection({
  host     : 'localhost',
	user     : '',
	password : '',
	database : 'backend',
});

connection.connect();

router.get('/', function(req, res, next) {
  connection.query('SELECT * from Users', function (error, results, fields) {
    res.send(results);
  });
  connection.end();
});
*/
module.exports = router;
