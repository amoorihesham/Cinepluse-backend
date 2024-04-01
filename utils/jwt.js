const jwt = require("jsonwebtoken");

function genrateJwtToken(user) {
  return jwt.sign(user, process.env.JWT_SECRET, {
    expiresIn: "30m",
  });
}
function genrateJwtRefreshToken(user) {
  return jwt.sign(user, process.env.JWT_REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
}
module.exports = { genrateJwtToken, genrateJwtRefreshToken };
