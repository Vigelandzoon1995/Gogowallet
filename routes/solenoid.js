var express = require('express');
var auth = require('../modules/auth');
var router = express.Router();

router.post('/state', auth.verifyToken, function (req, res){
	var device_id = req.body.device_id;
	var user_id = res.locals.user_id
	var solenoidstate = req.body.solenoidstate;

	db.query("SELECT * FROM devices WHERE id=? AND user_id=?",
		[device_id, user_id],
		function(err, result){
			db.query("UPDATE devices SET solenoidstate=? WHERE id=?", [solenoidstate, device_id], function (err, result) {
				if (err) {
					throw err;
				}
				if (result) {
					res.json({
						response: 'Solenoidstate changed'
					})
				} else {
					res.json({
						response: 'Error when changing solenoidstate'
					})
				}
			});
		})

})

router.post('/off', auth.verifyToken, function (req, res){
	res.json({
		response: 'Status: Off'
	})
})



module.exports = router;