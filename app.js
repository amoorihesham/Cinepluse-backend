const cookieParser = require("cookie-parser");
const express = require("express");
const cors = require("cors");
const Auth_Router = require("./routes/Auth.route");
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "*", credentials: true }));

app.use("/api", Auth_Router);

app.listen(2024, () => {
  console.log("Server Running");
});