const mongose = require("mongoose");
const user_schema = require("../schemas/user.schema");

const user = mongose.model("user", user_schema);

module.exports = user;
