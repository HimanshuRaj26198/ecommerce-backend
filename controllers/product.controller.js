const Products = require("../models/product.model");

const getAllProducts = async (req, res) => {
  console.log(req.user);
  if (req.session.viewCount) {
    req.session.viewCount = req.session.viewCount + 1;
  } else {
    req.session.viewCount = 1;
  }
  try {
    console.log("ViewCount", req.session.viewCount);
    const page = Number.parseInt(req.query.page);
    const limit = Number.parseInt(req.query.limit);
    let result = await Products.find()
      .limit(limit)
      .skip((page - 1) * limit)
      .exec();
    res.status(200).json({
      message: "Product fetched successfully",
      Products: result,
      viewCount: req.session.viewCount,
    });
  } catch (e) {
    console.log(e);
    res.status(404).json({ message: "Error in getting products" });
  }
};

const addProduct = async (req, res) => {
  let newProduct = new Products({
    name: req.body.name,
  });
  newProduct.save((err) => {
    if (!err) {
      console.log("Product Saved");
    } else {
      console.log(err);
    }
  });
};

const getOne = (req, res) => {
  Products.findById(req.params.id, (err, data) => {
    if (data) {
      res.status(200).json({
        product: data,
      });
    } else {
      res.status(404).json({
        message: "Product not found",
      });
    }
  });
};

module.exports = {
  getAllProducts: getAllProducts,
  addProduct: addProduct,
  getOne: getOne,
};
