const jwt = require("jsonwebtoken");
const verifyUser = (req, res, next) => {
  if (req.headers["authorization"]) {
    let bearerToken = req.headers["authorization"];
    let bearer = bearerToken.split(" ");
    let token = bearer[1];
    jwt.verify(token, process.env.TOKEN_SECRET, (err) => {
      if (!err) {
        next();
      } else {
        res.status(403).json({
          message: Unauthorized,
        });
      }
    });
  } else {
    res.status(403).json({
      message: "Access denied",
    });
  }
};

module.exports = verifyUser;
