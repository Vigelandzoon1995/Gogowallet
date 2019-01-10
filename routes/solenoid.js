var express = require('express');
var auth = require('../modules/auth');
var router = express.Router();

router.post('/on', auth.verifyToken, function (req, res){
	res.json({
		response: 'Status: On'
	})
})

router.post('/off', auth.verifyToken, function (req, res){
	res.json({
		response: 'Status: Off'
	})
})



module.exports = router;