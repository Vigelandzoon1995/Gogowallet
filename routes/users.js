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

router.put('/', auth.verifyToken, async function (req, res) {
  if (req.body.password == null && req.body.new_password == null) {
    let email = req.body.email;
    let first_name = req.body.first_name;
    let last_name = req.body.last_name;
    let bank_account = req.body.bank_account;
    let profile_pic = req.body.profile_picture;

    let queryNoPass = 'UPDATE users SET first_name=?, last_name=?, profile_picture=?, bank_account=? WHERE email=?';
    let paramsNoPass = [first_name, last_name, profile_pic, bank_account, email];

    db.query(queryNoPass, paramsNoPass, function (error, results, fields) {
      if (!error) {
        res.status(200);
        res.json({
          success: true
        });
      } else {
        res.status(500);
        res.json({ response: "Unable to update user", error: error });
      }
    });
  } else {
    let email = req.body.email;
    let first_name = req.body.first_name;
    let last_name = req.body.last_name;
    let bank_account = req.body.bank_account;
    let profile_pic = req.body.profile_picture;
    let password = req.body.password;
    let new_pass = req.body.new_password;
    let hash = await hashPassword(req.body.password);

    let queryWithPass = 'UPDATE users SET first_name=?, last_name=?, profile_picture=?, bank_account=?, password=? WHERE email=?';
    let paramsWithPass = [first_name, last_name, profile_pic, bank_account, hash, email];

    if (/^.*(?=.{10,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/.test(password) && /^.*(?=.{10,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/.test(new_pass)) {
      db.query(queryWithPass, paramsWithPass, function (error, results, fields) {
        if (!error) {
          res.status(200);
          res.json({
            success: true
          });
        } else {
          res.status(500);
          res.json({ response: "Unable to update user", error: error });
        }
      });
    } else {
      res.status(404);
      res.json({ response: "New password not conform requirements" });
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
    })

    return hashedPassword;
}

module.exports = router;
