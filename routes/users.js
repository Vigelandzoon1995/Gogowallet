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

router.put('/', auth.verifyToken, function (req, res) {
  let email = req.body.email;
  let first_name = req.body.first_name;
  let last_name = req.body.last_name;
  let bank_account = req.body.bank_account;
  let profile_pic = req.body.profile_picture;

  let queryNoPass = 'UPDATE users SET first_name=?, last_name=?, profile_picture=?, bank_account = ? WHERE email=?';
  let paramsNoPass = [first_name, last_name, profile_pic, bank_account, email];

  db.query(queryNoPass, paramsNoPass, function (error, results, fields) {
    if (!error) {
      res.status(200);
      res.json({
        user: {
          user_id: results[0].user_id,
          first_name: results[0].first_name,
          last_name: results[0].last_name,
          bank_account: results[0].bank_account,
          email: results[0].email,
          password: results[0].password,
          profile_picture: results[0].profile_picture
        }
      });
    } else {
      res.status(500);
      res.json({ response: "Unable to update user", error: error });
    }
  });
});

// router.put('/', auth.verifyToken, function (req, res) {
//   if (req.body.password == null) {
//     let email = req.body.email;
//     let first_name = req.body.first_name;
//     let last_name = req.body.last_name;
//     let profile_pic = req.body.profile_picture;

//     let queryNoPass = 'UPDATE users SET first_name=?, last_name=?, profile_picture=? WHERE email=?';
//     let paramsNoPass = [first_name, last_name, profile_pic, email];

//     db.query(queryNoPass, paramsNoPass, function (error, results, fields) {
//       if (!error) {
//         res.status(200);
//         res.json({
//           user: {
//             user_id: results[0].user_id,
//             first_name: results[0].first_name,
//             last_name: results[0].last_name,
//             email: results[0].email,
//             password: results[0].password,
//             profile_picture: results[0].profile_picture
//           }
//         });
//       } else {
//         res.status(500);
//         res.json({ response: "Unable to update user", error: error });
//       }
//     });
//   } else {
//     let email = req.body.email;
//     let first_name = req.body.first_name;
//     let last_name = req.body.last_name;
//     let profile_pic = req.body.profile_picture;
//     let password = req.body.password;
//     let new_pass = req.body.new_password;
//     let hash = hashPassword(req.body.password);

//     let queryWithPass = 'UPDATE users SET first_name=?, last_name=?, profile_picture=?, password=? WHERE email=?';
//     let paramsWithPass = [first_name, last_name, profile_pic, hash, email];

//     if (/^.*(?=.{10,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/.test(password) && /^.*(?=.{10,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/.test(new_pass)) {
//       db.query(queryWithPass, paramsWithPass, function (error, results, fields) {
//         if (!error) {
//           res.status(200);
//           res.json({
//             user: {
//               user_id: results[0].user_id,
//               first_name: results[0].first_name,
//               last_name: results[0].last_name,
//               email: results[0].email,
//               password: results[0].password,
//               profile_picture: results[0].profile_picture
//             }
//           });
//         } else {
//           res.status(500);
//           res.json({ response: "Unable to update user", error: error });
//         }
//       });
//     } else {
//       res.status(404);
//       res.json({ response: "New password not conform requirements" });
//     }
//   }
// });

module.exports = router;
