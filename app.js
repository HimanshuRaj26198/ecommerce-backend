const express = require("express");
const cors = require("cors");
const router = require("./routers/product.router");
const userRouter = require("./routers/user.router");
const MongoStore = require("connect-mongo");
const session = require("express-session");
const passport = require("passport");
require("./db/db");
require("dotenv").config();
require("./config/passport")(passport);
const app = express();
app.use(passport.initialize());
const sessionStore = MongoStore.create({
  mongoUrl: process.env.DBURL,
  collection: "sessions",
  mongoOptions: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
});

app.use(cors("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "super secret",
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
      maxAge: 250000,
    },
  })
);

app.use("/", router);
app.use("/user", userRouter.userRoute);

app.listen(process.env.PORT, (err) => {
  if (!err) {
    console.log("App listening on : ", process.env.PORT);
  } else {
    console.log("Error in listeining app ", err);
  }
});
