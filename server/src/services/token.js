const jwt = require("jsonwebtoken");
const secret = "jwt secret";

const generateToken = (user) => {
  const payload = {
    _id: user._id,
    username: user.username,
    email: user.email,
    img: user.img,
  };
  return jwt.sign(payload, secret, { expiresIn: "1h" });
};

const verifyToken = (token) => {
  return jwt.verify(token, secret);
};

module.exports = {
  generateToken,
  verifyToken,
};
