var express = require('express');
var auth = require('../modules/auth')
var roles = require('../modules/roles')
var router = express.Router();
const bcrypt = require('bcrypt');

router.get('/get', auth.verifyToken, function () {
    var user_id = res.locals.user_id
    db.query('SELECT user_id, email, first_name, last_name, profile_picture, budget, bank_account from users WHERE user_id=?',
        [user_id],
        function (error, results, fields) {
            res.send(results);
        });
})

router.get('/getById', auth.verifyToken, roles.isAdmin, function (req, res, next) {
    var id = req.query.id
    db.query('SELECT user_id, email, first_name, last_name, profile_picture, budget, bank_account from users WHERE user_id=?',
        [id],
        function (error, results, fields) {
            res.send(results);
        });
});

router.get('/getByEmail', auth.verifyToken, roles.isAdmin, function (req, res, next) {
    var email = req.query.email
    db.query('SELECT user_id, email, first_name, last_name, profile_picture, budget, bank_account from users WHERE email=?',
        [email],
        function (error, results, fields) {
            res.send(results);
        });
});

router.get('/getAll', auth.verifyToken, roles.isAdmin, function (req, res, next) {
    db.query('SELECT user_id, email, first_name, last_name, profile_picture, budget, bank_account from users',
        function (error, results, fields) {
            res.send(results);
        });

    router.get('/getPreferences', auth.verifyToken, function (req, res, next) {
        var user_id = req.query.user_id;
        db.query('SELECT user_id, lock_protection, distance_alarm, max_distance from preferences WHERE user_id=?',
            [user_id],
            function (error, results, fields) {
                res.send(results);
            });
    });

    router.post('/savePreferences', auth.verifyToken, function (req, res) {
        var user_id = res.locals.user_id;
        var lock_protection = req.body.lock_protection;
        var distance_alarm = req.body.distance_alarm;
        var max_distance = req.body.max_distance;

        db.query('UPDATE preferences SET lock_protection=?, distance_alarm=?, max_distance=? WHERE user_id=?',
            [lock_protection, distance_alarm, max_distance, user_id],
            function (error, results, fields) {
                if (results != null && results.affectedRows == 1) {
                    res.json({
                        success: true
                    });
                } else {
                    console.log(error);
                    res.json({
                        success: false
                    });
                }
            });
    });

    router.post('/update', auth.verifyToken, async function (req, res) {
        //Take the user id directly from the jwt middleware to ensure the user only can update his own account
        var user_id = res.locals.user_id
        if (req.body.password == null && req.body.new_password == null) {
            let email = req.body.email;
            let first_name = req.body.first_name;
            let last_name = req.body.last_name;
            let bank_account = req.body.bank_account;
            let profile_pic = req.body.profile_picture;
            let pin = req.body.pin_code;

            let queryNoPass = 'UPDATE users SET first_name=?, last_name=?, profile_picture=?, bank_account=?, pin_code=?, email=? WHERE user_id=?';
            let paramsNoPass = [first_name, last_name, profile_pic, bank_account, pin, email, user_id];

            db.query(queryNoPass, paramsNoPass, function (error, results, fields) {
                if (!error) {
                    res.status(200);
                    res.json({
                        success: true
                    });
                } else {
                    res.status(500);
                    res.json({
                        response: "Unable to update user",
                        error: error
                    });
                }
            });
        } else {
            let email = req.body.email;
            let first_name = req.body.first_name;
            let last_name = req.body.last_name;
            let bank_account = req.body.bank_account;
            let profile_pic = req.body.profile_picture;
            let pin = req.body.pin_code;
            let password = req.body.password;
            let new_pass = req.body.new_password;
            let hash = await hashPassword(req.body.password);

            let queryWithPass = 'UPDATE users SET first_name=?, last_name=?, profile_picture=?, bank_account=?, pin_code=?, password=? WHERE email=?';
            let paramsWithPass = [first_name, last_name, profile_pic, bank_account, pin, hash, email];

            if (/^.*(?=.{10,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/.test(password) && /^.*(?=.{10,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/.test(new_pass)) {
                db.query(queryWithPass, paramsWithPass, function (error, results, fields) {
                    if (!error) {
                        res.status(200);
                        res.json({
                            success: true
                        });
                    } else {
                        res.status(500);
                        res.json({
                            response: "Unable to update user",
                            error: error
                        });
                    }
                });
            } else {
                res.status(404);
                res.json({
                    response: "New password not conform requirements"
                });
            }
        }
    });

    async function hashPassword(password) {
        const saltRounds = 14;

        const hashedPassword = await new Promise((resolve, reject) => {
            bcrypt.hash(password, saltRounds, function (err, hash) {
                if (err) reject(err);
                resolve(hash);
            });
        });

        return hashedPassword;
    }
});

module.exports = router;
