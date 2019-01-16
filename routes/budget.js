var express = require('express');
var auth = require('../modules/auth')
var router = express.Router();

router.post('/create', auth.verifyToken, function (req, res) {
    var user_id = res.locals.user_id;
    var category = req.body.category;
    var start_date = req.body.start_date;
    var end_date = req.body.end_date;
    var amount = req.body.amount;
    var alarm = req.body.alarm;
    var limit_lock = req.body.limit_lock;
    db.query("INSERT INTO budgets (category, start_date, end_date, amount, alarm, user_id, limit_lock) VALUES (?,?,?,?,?,?,?)",
        [category, start_date, end_date, amount, alarm, user_id, limit_lock],
        function (error, results) {
            if (results != null && results.affectedRows == 1) {
                res.json({
                    success: true
                });
            } else {
                console.log(error)
                res.json({
                    success: false
                });
            }
        });
});

router.get('/getAll', auth.verifyToken, function (req, res) {
    var user_id = res.locals.user_id
    db.query("SELECT * FROM budgets WHERE user_id=?",
        [user_id],
        function (error, results) {
            res.send(results);
        })
})

router.get('/getById', auth.verifyToken, function (req, res) {
    var id = req.query.id
    db.query("SELECT * FROM budgets WHERE id=?",
        [id],
        function (error, results) {
            res.send(results);
        })
})

router.post('/update', auth.verifyToken, function (req, res) {
    var user_id = res.locals.user_id
    var id = req.body.id
    var category = req.body.category
    var start_date = req.body.start_date
    var end_date = req.body.start_date
    var amount = req.body.amount
    var alarm = req.body.alarm
    var limit_lock = req.body.limit_lock == true
    db.query('UPDATE budgets SET category=?, start_date=?, end_date=?, amount=?, alarm=?, limit_lock=? WHERE user_id=? AND id=?',
        [category, start_date, end_date, amount, alarm, limit_lock, user_id, id],
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

router.get('/delete', auth.verifyToken, function (req, res, next) {
    //Take the user id directly from the jwt middleware to ensure the user only can remove budgets of his own account
    var id = req.query.id
    db.query('DELETE from budgets WHERE id=?',
        [id],
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
