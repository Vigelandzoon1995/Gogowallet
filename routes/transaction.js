var express = require('express');
var auth = require('../modules/auth');
var router = express.Router();

router.post('/create', auth.verifyToken, function (req, res) {
	var lat = req.body.lat;
	var long = req.body.long;
	var time = req.body.time;
	var device_id = req.body.device_id;

	db.query("SELECT * FROM devices WHERE id=?",
		[device_id],
		function (err, result) {
			if (result[0] != undefined && result[0].user_id == res.locals.user_id) {
				db.query("INSERT INTO gps (latitude, longtitude, time, device_id) VALUES (?, ?, ?, ?)", [lat, long, time, device_id], function (err, result) {
					if (err) {
						throw err;
					}
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
			} else {
				res.json({
					response: 'Error when inserting gps'
				})
			}
		})
})

router.get('/getAll', auth.verifyToken, function (req, res) {
	//Take the user id directly from the jwt middleware to ensure the user only can get the coordinates of his own device
	var user_id = res.locals.user_id;
	db.query('SELECT g.id, g.latitude, g.longtitude, g.time, g.device_id FROM gps AS g, devices AS d WHERE d.user_id = ? AND g.device_id = d.id ORDER BY STR_TO_DATE(g.time, '%Y-%m-%d %HH:%ii') DESC',
		[user_id],
		function (error, results, fields) {
			res.send(results);
		});
})

router.get('/getBetweenDates', auth.verifyToken, function (req, res) {
	//Take the user id directly from the jwt middleware to ensure the user only can get the coordinates of his own device
	var user_id = res.locals.user_id;
    var start = req.query.start
    var end = req.query.end
    db.query("SELECT g.id, g.latitude, g.longtitude, g.time, g.device_id FROM gps AS g, devices AS d WHERE d.user_id = ? AND g.device_id = d.device_id AND DATE_FORMAT(date, '%Y-%m-%d') >= DATE_FORMAT(?, '%Y-%m-%d') AND DATE_FORMAT(date, '%Y-%m-%d') <= DATE_FORMAT(?, '%Y-%m-%d') ORDER BY STR_TO_DATE(g.time, '%Y-%m-%d %HH:%ii') DESC",
        [bank_account, start, end],
        function (error, results) {
            res.send(results);
        })
})

module.exports = router;
