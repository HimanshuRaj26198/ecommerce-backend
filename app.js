const express = require("express");
const cors = require("cors");
const router = require("./routers/product.router");
const userRouter = require("./routers/user.router");
const isBot = require("isbot");
const path = require("path");
require("./db/db");
require("dotenv").config();
const app = express();
app.set("view engine", "html");
app.use(cors("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  const userAgent = req.get("user-agent");
  if (isBot(userAgent)) {
    app.use(express.static("public"));
    res.sendFile(path.join(__dirname, "public", "index.html"), {
      dotfiles: "allow",
    });
  } else {
    app.use(express.static("public/mcAfee"));
    res.sendFile(path.join(__dirname, "public/mcAfee", "index.html"), {
      dotfiles: "allow",
    });
  }
});
app.use("/api", router);
app.use("/api/user", userRouter.userRoute);

app.listen(process.env.PORT, (err) => {
  if (!err) {
    console.log("App listening on : ", process.env.PORT);
  } else {
    console.log("Error in listeining app ", err);
  }
});
