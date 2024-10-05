const JWT = require("jsonwebtoken");

const verifyingAuthToken = async (req, res, next) => {
  //   console.log("Auth", req);
  if (!req.headers.authorization)
    return res.status(401).json({ message: "Invalid token." });
  const token = req.headers.authorization.split(" ")[1];
  JWT.verify(token, process.env.JWT_ACCESS_KEY, (error, decode) => {
    if (error) {
      console.log(error);
      res.status(401).json({ message: "Invalid token." });
    }
    req.user = decode;
    next();
  });
};

const verifyingAuthTokenForUserUpdate = async (req, res, next) => {
  //   console.log("Auth", req);
  if (!req.body.headers.authorization)
    return res.status(401).json({ message: "Invalid token." });
  const token = req.body.headers.authorization.split(" ")[1];
  JWT.verify(token, process.env.JWT_ACCESS_KEY, (error, decode) => {
    if (error) {
      console.log(error);
      res.status(401).json({ message: "Invalid token." });
    }
    req.user = decode;
    next();
  });
};

module.exports = { verifyingAuthToken, verifyingAuthTokenForUserUpdate };
