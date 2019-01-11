var express = require('express');
var auth = require('../modules/auth')
var router = express.Router();

router.post('/create', auth.verifyToken, function (req, res) {
    var user_id = res.locals.user_id
    var name = req.body.name
    var amount = req.body.amount
    var date = req.body.date
    var bank_account = req.body.bank_account
    db.query("INSERT INTO transactions (user_id, name, amount, date, bank_account) VALUES (?,?,?,?,?)",
        [user_id, name, amount, date, bank_account],
        function (error, results) {
            if (results != null && results.affectedRows == 1) {
                res.json({
                    success: true
                })
            } else {
                console.log(error)
                res.json({
                    success: false
                })
            }
        });
})

router.get('/getById', auth.verifyToken, function (req, res) {
    var user_id = res.locals.user_id
    var id = req.query.id
    db.query("SELECT * FROM transactions WHERE user_id=? AND id=?",
        [user_id, id],
        function (error, results) {
            res.send(results);
        })
})

router.get('/getToday', auth.verifyToken, function (req, res) {
    var user_id = res.locals.user_id
    db.query("SELECT * FROM transactions WHERE user_id=? AND DATE_FORMAT(date, '%Y-%m-%d')=CURDATE()",
        [user_id],
        function (error, results) {
            res.send(results);
        })
})

router.get('/getSince', auth.verifyToken, function (req, res) {
    var user_id = res.locals.user_id
    var date = req.query.date
    db.query("SELECT * FROM transactions WHERE user_id=? AND DATE_FORMAT(date, '%Y-%m-%d') >= DATE_FORMAT(?, '%Y-%m-%d')",
        [user_id, date],
        function (error, results) {
            res.send(results);
        })
})

router.get('/getBetweenDates', auth.verifyToken, function (req, res) {
    var user_id = res.locals.user_id
    var start = req.query.start
    var end = req.query.end
    db.query("SELECT * FROM transactions WHERE user_id=? AND DATE_FORMAT(date, '%Y-%m-%d') >= DATE_FORMAT(?, '%Y-%m-%d') AND DATE_FORMAT(date, '%Y-%m-%d') <= DATE_FORMAT(?, '%Y-%m-%d')",
        [user_id, start, end],
        function (error, results) {
            res.send(results);
        })
})

router.get('/delete', auth.verifyToken, function (req, res) {
    var user_id = res.locals.user_id
    var id = req.query.id
    db.query('DELETE from transactions WHERE user_id=? AND id=?',
        [user_id, id],
        function (error, results, fields) {
            if (results != null && results.affectedRows == 1) {
                res.json({
                    success: true
                })
            } else {
                console.log(error)
                res.json({
                    success: false
                })
            }
        })
})
module.exports = router;
