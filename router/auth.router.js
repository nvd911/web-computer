var express = require("express");
var router = express.Router();

var authControllner = require("./../controllner/auth.controllner");

router.get("/", authControllner.index);
router.post("/", authControllner.postIndex);
router.get("/add", authControllner.createAuth);
router.post("/add", authControllner.postCreateAuth);

router.get("/logout", authControllner.logoutAuth);
module.exports = router;
