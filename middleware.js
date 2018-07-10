var jwt = require("jsonwebtoken");

validateToken = function(token) {
  return new Promise((resolve, reject) => {
    // verify a token symmetric
    jwt.verify(token, "firstApplication", function(err, decoded) {
      if (err) {
        resolve({ status: false, error: err });
      }
      resolve({ status: true, decoded: decoded });
    });
  });
};

verifyToken = async function(req, res, next) {
  const token = req.get("x-access-token");
  if (!token) {
    res.status(401);
    res.send({ msg: "Unauthorized request" });
    return;
  }
  const response = await validateToken(token);
  if (!response.status) {
    res.status(401);
    res.send({ msg: response.error.name });
  } else {
    next();
  }
};

module.exports = verifyToken;
