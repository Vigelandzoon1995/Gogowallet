var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();

const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';
const hashed = '';

router.post('/', function (req, res) {
  var username = req.body.username;
  db.query("SELECT * from Users where Username = ?",
    [username],
    function (error, results, fields) {
      console.log(results)
      if (results.length != 0 && results[0].Password != null && results[0].ID != null) {
        bcrypt.compare(req.body.password, results[0].Password, function (err, result) {
          if (result) {
            var token = jwt.sign({ id: results[0].ID }, "secretkey");
            res.json({
              token: token
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

