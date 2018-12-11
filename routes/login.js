var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();

router.post('/', function (req, res) {
  /*db.query(`SELECT Id 
    from Users 
    where Username =`,
    function (error, results, fields) {
      if(results != null){*/
        const token = jwt.sign({ id:3 }, "secretkey");
        res.json({
          token: token
        })
      /*}
    });*/
  
});

module.exports = router;

