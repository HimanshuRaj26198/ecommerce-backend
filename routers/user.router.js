const router = require("express").Router();
const userCtrl = require("../controllers/user.controller");
const verify = require("../middlewares/verify_user");

router.post("/signup", userCtrl.signUp);
router.post("/signIn", userCtrl.signIn);
router.get("/test", verify, userCtrl.test);

module.exports = { userRoute: router };
