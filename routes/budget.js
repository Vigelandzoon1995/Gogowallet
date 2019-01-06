var express = require('express');
var auth = require('../modules/auth')
var router = express.Router();

router.post('/create', auth.verifyToken, function (req, res) {
    var user_id = res.locals.user_id
    var category = req.body.category
    var start_date = req.body.start_date
    var end_date = req.body.start_date
    var amount = req.body.amount
    var alarm = req.body.alarm
    var last_checked = req.body.last_checked
    var limit_lock = req.body.limit_lock
    db.query("INSERT INTO budgets (category, start_date, end_date, amount, alarm, last_checked, user_id, limit_lock) VALUES (?,?,?,?,?,?,?,?)",
        [category, start_date, end_date, amount, alarm, last_checked, user_id, limit_lock],
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

module.exports = router;