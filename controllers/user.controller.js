const User = require("../models/users.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const signUp = (req, res) => {
  console.log(req.body);
  let newUser = new User({
    name: req.body.name,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    password: req.body.password,
  });

  try {
    newUser.save((err, data) => {
      if (!err) {
        res.status(200).json({
          message: "User Created Succefully",
          data: data,
        });
      } else {
        console.log(err);
        res.status(400).json({
          message: "Error in saveing User",
          error: err,
        });
      }
    });
  } catch (e) {
    console.log(e);
    res.status(400).json({
      message: "Error in saving user",
      error: e,
    });
  }
};

const signIn = (req, res) => {
  console.log(req.body);

  User.findOne({ email: req.body.email }, async (err, data) => {
    if (err) {
      console.log("User Not Found");
      res.status(404).json({
        message: "User not found",
      });
    } else {
      await bcrypt.compare(req.body.password, data.password, (err, user) => {
        if (err) {
          res.status(400).json({ message: "Some issue occured" });
        } else if (user) {
          let accessToken = jwt.sign(req.body.email, process.env.TOKEN_SECRET);
          res.status(200).json({
            message: "Successfully Auuthenticated",
            token: accessToken,
          });
        } else if (!user) {
          res.status(403).json({
            message: "Incorrect Password",
          });
        }
      });
    }
  });
};

const test = (req, res) => {
  res.json({ message: "Hi I am Admin" });
};

module.exports = { signUp: signUp, signIn: signIn, test: test };
