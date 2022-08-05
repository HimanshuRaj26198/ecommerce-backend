const express = require("express");
const cors = require("cors");
const router = require("./routers/product.router");
const userRouter = require("./routers/user.router");
const MongoStore = require("connect-mongo");
const session = require("express-session");
const passport = require("passport");
const path = require("path");
require("./db/db");
require("dotenv").config();
require("./config/passport")(passport);
const app = express();

app.use(cors("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));
app.use("/api", router);
app.use("/api/user", userRouter.userRoute);

app.listen(process.env.PORT, (err) => {
  if (!err) {
    console.log("App listening on : ", process.env.PORT);
  } else {
    console.log("Error in listeining app ", err);
  }
});
