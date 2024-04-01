const bcrypt = require("bcrypt");

async function Hash_Password(password) {
  const hashedPassword = await bcrypt.hash(password, 10);

  return hashedPassword;
}

module.exports = Hash_Password;
