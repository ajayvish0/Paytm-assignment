const JWT_SECRET = require("../config");
const jwt = require("jsonwebtoken");

function authmiddleware(req, res, next) {
  const header = req.headers["authorization"];
  if (!header) {
    res.json({
      message: "you're not allowed to access ",
    });
  }
  const token = header.split(" ")[1];
  console.log(token);

  try {
    const decode = jwt.verify(token, JWT_SECRET);
    req.userId = decode.userId;
    next();
  } catch (err) {
    return res.status(403).json({});
  }
}
module.exports = authmiddleware;
