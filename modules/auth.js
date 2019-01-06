var jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    jwt.verify(bearerToken, "secretkey", function (err, data) {
      if (err) {
        console.log(err)
        res.sendStatus(403);
      } else {
        req.token = bearerToken;
        res.locals.user_id = data.id
        next();
      }
    });
  } else {
    res.sendStatus(403);
  }
}

exports.verifyToken = verifyToken;
