var express = require('express');
var router = express.Router();

const bcrypt = require('bcrypt');
const saltRounds = 16;

router.post('/', function (req, res) {
    if (req.body.password != null &&
        req.body.password.length > 10) {
        bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
            db.query('SELECT COUNT(*) AS total FROM Users WHERE Username="test"',
                { "Username": req.body.Username },
                function (error, results, fields) {
                    console.log(results)
                }
            );
            /*db.query(`  INSERT INTO Users (Username, Password) 
                        SELECT '?', '?' 
                        FROM DUAL WHERE NOT EXISTS (SELECT Username FROM Users WHERE Username=?)`,
                {
                    Username: "t",
                    Password: "t"
                },
                function (error, results, fields) {
                    if (results != null) {
                    }
                });
                */
            console.log(hash)
        });
    }
    res.json({
        token: ""
    })

});

module.exports = router;

