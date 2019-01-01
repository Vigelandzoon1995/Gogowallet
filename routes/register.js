var express = require('express');
var router = express.Router();

const bcrypt = require('bcrypt');

router.post('/', async function (req, res) {
    if (req.body.password != null &&
        req.body.password.length >= 8 &&
        /^.*(?=.{10,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/.test(req.body.password)) {
        var hash = await hashPassword(req.body.password)
        var email = req.body.email;
        var first_name = req.body.first_name;
        var last_name = req.body.last_name;
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
    } else {
        res.json({
            success: false
        })
    }
});

async function hashPassword(password) {
    const saltRounds = 14;

    const hashedPassword = await new Promise((resolve, reject) => {
        bcrypt.hash(password, saltRounds, function (err, hash) {
            if (err) reject(err)
            resolve(hash)
        });
    })

    return hashedPassword
}

module.exports = router;

