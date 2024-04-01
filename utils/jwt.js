const jwt = require("jsonwebtoken");

async function genrateJwt({ firstName, lastName, email }) {
  const token = jwt.sign(
    { firstName, lastName, email, watchlis: [], isAdmin: false },
    process.env.JWT_SECRET,
    { expiresIn: "30m" }
  );

  return token;
}

module.exports = getJWT;
