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
            var token = jwt.sign({ id: results[0].ID }, "secretkey");
            res.json({
              token: token
            })
          } else {
            res.status(404).json({
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

