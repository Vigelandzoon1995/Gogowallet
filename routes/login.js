var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();

const bcrypt = require('bcrypt');

router.post('/', function (req, res) {
  var email = req.body.email;
  db.query('SELECT * from users u INNER JOIN user_passwords p ON u.user_id = p.user_id where email = ?;',
    [email],
    function (error, results, fields) {
      if (results.length != 0 && results[0].password != null && results[0].user_id != null) {
        bcrypt.compare(req.body.password, results[0].password, function (err, result) {
          if (result) {
            var token = jwt.sign({ id: results[0].user_id }, "secretkey");
            res.json({
              token: token,
              user: {
                user_id: results[0].user_id,
                first_name: results[0].first_name,
                last_name: results[0].last_name,
                bank_account: results[0].bank_account,
                email: results[0].email,
                pin_code: results[0].pin_code,
                profile_picture: results[0].profile_picture
              }
            })
          } else {
            res.json({
              token: false
            })
          }
        });
      } else {
        res.json({
          token: false
        })
      }
    });
});

router.post('/pin', function (req, res) {
  var email = req.body.email;
  var pin = req.body.pin;
  db.query('SELECT * from users u INNER JOIN user_passwords p ON u.user_id = p.user_id where email = ? AND pin_code = ?;',
    [email, pin],
    function (error, results, fields) {
      if (results.length != 0 && results[0].password != null && results[0].pin_code != null && results[0].user_id != null) {
        bcrypt.compare(req.body.password, results[0].password, function (err, result) {
          if (result) {
            var token = jwt.sign({ id: results[0].user_id }, "secretkey");
            res.json({
              token: token,
              user: {
                user_id: results[0].user_id,
                first_name: results[0].first_name,
                last_name: results[0].last_name,
                bank_account: results[0].bank_account,
                email: results[0].email,
                pin_code: results[0].pin_code,
                profile_picture: results[0].profile_picture
              }
            })
          } else {
            res.json({
              token: false
            })
          }
        });
      } else {
        res.json({
          token: false
        })
      }
    });
});

module.exports = router;

