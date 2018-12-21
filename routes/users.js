/*jshint esversion: 6 */

var express = require('express');
var auth = require('../modules/auth');
var router = express.Router();

const bcrypt = require('bcrypt');
const saltRounds = 14;

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

    let queryNoPass = 'UPDATE users SET first_name=?, last_name=?, profile_picture=? WHERE email=?';
    let paramsNoPass = [first_name, last_name, profile_pic, email];

    db.query(queryNoPass, paramsNoPass, function (error, results, fields) {
      if (!error) {
        res.status(200);
        res.json({
            user: {
              user_id: results[0].user_id,
              first_name: results[0].first_name,
              last_name: results[0].last_name,
              email: results[0].email,
              password: results[0].password,
              profile_picture: results[0].profile_picture
            }
          }
        );
      } else {
        res.status(500);
        res.json({ response: "Unable to update user", error: error });
      }
    });
  } else {
    var email = req.body.email;
    var first_name = req.body.first_name;
    var last_name = req.body.last_name;
    var profile_pic = req.body.profile_picture;
    var password = req.body.password;
    var new_pass = req.body.new_password;

    let queryWithPass = 'UPDATE users SET first_name=?, last_name=?, profile_picture=?, password=? WHERE email=?';
    let paramsWithPass = [first_name, last_name, profile_pic, new_pass, email];
    
    if(/^.*(?=.{10,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/.test(req.body.new_password)) {
      continue;
    } else {
      res.status(404);
      res.json({ response: "New password not conform requirements", error: error });
    }
    
    db.query(queryWithPass, paramsWithPass, function (error, results, fields) {
      if (!error) {
        res.status(200);
        res.json({
            user: {
              user_id: results[0].user_id,
              first_name: results[0].first_name,
              last_name: results[0].last_name,
              email: results[0].email,
              password: results[0].password,
              profile_picture: results[0].profile_picture
            }
          }
        );
      } else {
        res.status(500);
        res.json({ response: "Unable to update user", error: error });
      }
    });
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
