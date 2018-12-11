var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();

const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';
const hashed = '';

router.post('/', function (req, res) {
  bcrypt.hash(myPlaintextPassword, saltRounds, function (err, hash) {
    //console.log(hash)
  });
  const token = jwt.sign({ id: 3 }, "secretkey");
  res.json({
    token: token
  })
  /*
db.query(`SELECT Id 
from Users 
where Username =`,
function (error, results, fields) {
if (results != null) {
  
}
});
*/
});

module.exports = router;

