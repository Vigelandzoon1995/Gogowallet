var express = require('express');
var auth = require('../modules/auth');
var router = express.Router();

router.post('/', auth.verifyToken, function(req, res) {
	var lat = req.body.lat;
	var long = req.body.long;
	var time = req.body.time;
	var sql = "INSERT INTO gps (latitude, longtitude, time) VALUES (?, ?, ?)";
	db.query(sql, [lat, long, time], function (err, result) {
		if(err){
			throw err;
		}
		console.log('GPS inserted.');
		if (result){
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

module.exports = router;