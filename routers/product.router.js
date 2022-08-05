const router = require("express").Router();
const productCtrl = require("../controllers/product.controller");
const verify = require("../middlewares/verify_user");
const passport = require("passport");

router.get(
  "/",

  productCtrl.getAllProducts
);
router.post("/add", productCtrl.addProduct);
router.get("/:id", productCtrl.getOne);

module.exports = router;
