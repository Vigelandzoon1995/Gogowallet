/*jshint esversion: 6 */

var express = require('express');
var auth = require('../modules/auth');
var router = express.Router();

router.get('/', auth.verifyToken, function (req, res, next) {
  db.query('SELECT * from users', function (error, results, fields) {
    res.send(results);
  });
});

router.put('/', auth.verifyToken, function (req, res, next) {
  if(req.body.password == null) {
    var email = req.body.email;
    var first_name = req.body.first_name;
    var last_name = req.body.last_name;
    var profile_pic = req.body.profile_picture;

    let queryNoPass = 'UPDATE users SET email=?, first_name=?, last_name=?, profile_picture=?';
    let paramsNoPass = [email, first_name, last_name, profile_pic];

    db.query(queryNoPass, paramsNoPass, function (error, results, fields) {
      if (!error) {
        res.send(JSON.stringify({
          "status": 200, "error": null, "response": {
            user: {
              user_id: results[0].user_id,
              first_name: results[0].first_name,
              last_name: results[0].last_name,
              email: results[0].email,
              password: results[0].password,
              profile_picture: results[0].profile_picture
            }
          }
        }));
      } else {
        res.send(JSON.stringify({
          "status": 500, "error": "Unable to update user", "response": null
        }));
      }
    });
  } else {
    var email = req.body.email;
    var first_name = req.body.first_name;
    var last_name = req.body.last_name;
    var profile_pic = req.body.profile_picture;
    var password = req.body.password;
    var new_pass = req.body.new_password;

    let queryWithPass = 'UPDATE users SET email=?, first_name=?, last_name=?, profile_picture=?, password=?';
    let paramsWithPass = [email, first_name, last_name, profile_pic, new_pass];
    
    db.query(queryWithPass, paramsWithPass, function (error, results, fields) {
      if (!error) {
        res.json({
          user: {
              user_id: results[0].user_id,
              first_name: results[0].first_name,
              last_name: results[0].last_name,
              email: results[0].email,
              password: results[0].password,
              profile_picture: results[0].profile_picture
            }
        });
      } else {
        res.send(JSON.stringify({
          "status": 500, "error": "Unable to update user - password not null", "response": null
        }));
      }
    });
  }
});


module.exports = router;
