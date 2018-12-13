var express = require('express');
var router = express.Router();

const bcrypt = require('bcrypt');
const saltRounds = 14;

router.post('/', function (req, res) {
    if (req.body.password != null &&
        req.body.password.length > 10) {
        bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
            var email = req.body.email;
            var first_name = req.body.first_name;
            var last_name = req.body.last_name;
            console.log(req.body)
            db.query('INSERT INTO users (email, first_name, last_name) SELECT ?, ?, ? FROM DUAL WHERE NOT EXISTS (SELECT email FROM users WHERE email=?);',
                [email, first_name, last_name, email],
                function (error, results, fields) {
                    if (results != null && results.affectedRows == 1) {
                        db.query('INSERT INTO user_passwords (user_id, password) VALUES((SELECT user_id FROM users WHERE email=?), ?)',
                            [email, hash],
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
                            });
                    } else {
                        console.log(error)
                        res.json({
                            success: false
                        })
                    }
                },
            );
        });
    } else {
        console.log(error)
        res.json({
            success: false
        })
    }
});

module.exports = router;

