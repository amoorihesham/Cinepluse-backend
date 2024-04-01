const mongose = require("mongoose");
const user = require("../models/user");
const resStatus = require("../utils/response.status");

async function Register(request, response) {
  const { firstName, lastName, email, password } = request?.body;
  try {
    await mongose.connect("mongodb://127.0.0.1:27017/movieDB");
    const isUserExist = await user.findOne({ email });
    if (!isUserExist) {
      const createdUser = await user.create({
        firstName,
        lastName,
        email,
        password,
      });
      return response
        .status(201)
        .json({ status: resStatus.SUCCESS, data: createdUser });
    } else {
      return response.status(200).json({
        status: resStatus.FAIL,
        data: {},
        message: "Email address already in use.",
      });
    }
  } catch (err) {
    return response.status(500).json({
      status: resStatus.ERROR,
      data: {},
      message: "Error occured when try to connect to database.",
    });
  }
}
async function Login(request, response) {}

module.exports = { Register, Login };
