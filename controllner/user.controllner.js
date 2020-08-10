const productModel = require("./../Model/product.Model");

module.exports.index = (req, res) => {
  productModel.find((err, data) => {
    if (err) {
      console.log("find data error");
    } else {
      res.render("User", { page: "home", product: data });
    }
  });
};
