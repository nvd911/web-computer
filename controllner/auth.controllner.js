const express = require("express");
const app = express();
require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const saltRounds = 10;

const authModel = require("./../Model/auth.Model");
const { find } = require("./../Model/auth.Model");
const { ready } = require("jquery");

module.exports.index = (req, res) => {
  authModel.find((err, data) => {});
  res.render("User", {
    page: "auth",
  });
};

module.exports.postIndex = (req, res) => {
  authModel.findOne({ userName: req.body.userName }, (err, data) => {
    if (err) {
      res.json({ kq: 0, mess: err });
    } else {
      if (data === null) {
        res.redirect("http://localhost:3000/auth");
      } else {
        bcrypt.compare(req.body.password, data.password, function (
          err,
          result
        ) {
          // result == true
          if (result == false) {
            res.redirect("http://localhost:3000/auth");
          } else {
            const user = { userName: req.body.userName };
            const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
              expiresIn: "100000s",
            });
            req.session.token = token;
            if (typeof localStorage === "undefined" || localStorage === null) {
              var LocalStorage = require("node-localstorage").LocalStorage;
              localStorage = new LocalStorage("./scratch");
            }

            localStorage.setItem("token", token);
            res.redirect("http://localhost:3000/admin");
          }
        });
      }
    }
  });
};

module.exports.createAuth = (req, res) => {
  res.render("User", { page: "createAuth" });
};

module.exports.postCreateAuth = (req, res) => {
  authModel.find(
    {
      userName: req.body.userName,
    },
    (err, data) => {
      if (err) {
        res.json({ kq: 0, mess: err });
      } else {
        if (data.length == 0) {
          bcrypt.genSalt(saltRounds, function (err, salt) {
            bcrypt.hash(req.body.password, salt, function (err, hash) {
              var auth = new authModel({
                userName: req.body.userName,
                password: hash,
              });

              auth.save((err) => {
                if (err) {
                  console.log("error save auth data");
                } else {
                  res.redirect("http://localhost:3000/auth");
                }
              });
            });
          });
        } else {
          res.json({ kq: 0, mess: "username đã tồn tại" });
        }
      }
    }
  );
};

module.exports.logoutAuth = (req, res) => {
  localStorage.setItem("token", "");
  res.redirect("http://localhost:3000/auth");
};
