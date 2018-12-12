var express = require('express');
var router = express.Router();

const bcrypt = require('bcrypt');
const saltRounds = 14;

router.post('/', function (req, res) {
    if (req.body.password != null &&
        req.body.password.length > 10) {
        bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
            var username = req.body.username;
            db.query("INSERT INTO Users (Username, Password) SELECT ?, ? FROM DUAL WHERE NOT EXISTS (SELECT Username FROM Users WHERE Username=?)",
                [username, hash, username],
                function (error, results, fields) {
                    if (results != null && results.affectedRows == 1) {
                        res.json({
                            success: true
                        })
                    } else {
                        res.json({
                            success: false
                        })
                    }
                });
        });
    }


});

module.exports = router;

