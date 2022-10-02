require("dotenv").config();
const jwt = require("jsonwebtoken");

const generateToken = (payload) => {
  const token = jwt.sign({ user: payload }, process.env.SECRET, {
    expiresIn: "2d",
  });
  return token;
};

const validateToken = (token) => {
  return jwt.verify(token, process.env.SECRET);
};

module.exports = { generateToken, validateToken };
