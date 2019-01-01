var express = require('express');
var auth = require('../modules/auth')
var router = express.Router();

router.get('/getById', auth.verifyToken, function (req, res, next) {
    var id = req.query.id
    db.query('SELECT user_id, email, first_name, last_name, profile_picture, budget, bank_account from users WHERE user_id=?',
        [id],
        function (error, results, fields) {
            res.send(results);
        });
});

router.get('/getByEmail', auth.verifyToken, function (req, res, next) {
    var email = req.query.email
    db.query('SELECT user_id, email, first_name, last_name, profile_picture, budget, bank_account from users WHERE email=?',
        [email],
        function (error, results, fields) {
            res.send(results);
        });
});

router.get('/getAll', auth.verifyToken, function (req, res, next) {
    db.query('SELECT user_id, email, first_name, last_name, profile_picture, budget, bank_account from users',
        function (error, results, fields) {
            res.send(results);
        });
});

module.exports = router;
