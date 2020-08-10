var express = require("express");
var router = express.Router();

var adminControllner = require("./../controllner/admin.controllner");

router.get("/", adminControllner.index);

router.get("/add", adminControllner.addProduct);
router.post("/add", adminControllner.postAddProduct);

router.post("/edit", adminControllner.postEditProduct);
router.get("/edit/:id", adminControllner.editProduct);

router.get("/delete/:id", adminControllner.deleteProduct);

module.exports = router;
