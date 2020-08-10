var express = require("express");
var router = express.Router();

const userControllner = require("./../controllner/user.controllner");

router.get("/", userControllner.index);

module.exports = router;
