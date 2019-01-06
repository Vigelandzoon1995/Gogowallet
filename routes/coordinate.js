var express = require('express');
var auth = require('../modules/auth');
var router = express.Router();

router.post('/create', auth.verifyToken, function (req, res) {
	var lat = req.body.lat;
	var long = req.body.long;
	var time = req.body.time;
	var sql = "INSERT INTO gps (latitude, longtitude, time) VALUES (?, ?, ?)";
	db.query(sql, [lat, long, time], function (err, result) {
		if (err) {
			throw err;
		}
		console.log('GPS inserted.');
		if (result) {
			res.json({
				response: 'Gps inserted'
			})
		} else {
			res.json({
				response: 'Error when inserting gps'
			})
		}
	});
})

/*router.get('/getAll', auth.verifyToken, function (req, res) {
	//Take the user id directly from the jwt middleware to ensure the user only can get the coordinates of his own device
	var user_id = res.locals.user_id
	db.query('SELECT *',
		function (error, results, fields) {
			res.send(results);
		});
})*/

module.exports = router;