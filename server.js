const express = require("express");
var jwt = require("jsonwebtoken");
var session = require("express-session");
require("dotenv").config();
var bodyParser = require("body-parser");
const app = express();

const adminRouter = require("./router/admin.router");
const userRouter = require("./router/user.router");
const authRouter = require("./router/auth.router");

app.set("trust proxy", 1);
app.use(
  session({
    secret: process.env.ACCESS_TOKEN_SECRET,
    cookie: { maxAge: 100000 },
  })
);

app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(3000);

//mongodb
const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://nvd911:0iWMtrxitBikijv1@newcluster.0fcyg.mongodb.net/computer?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  },
  (err) => {
    if (err) {
      console.log("connect error");
    } else {
      console.log("connect success");
    }
  }
);

app.use("/auth", authRouter);
app.use((req, res, next) => {
  // const token = req.session.token;  là mã jwt
  const sessionId = req.session.token;
  const token = localStorage.getItem("token");

  if (token == null || sessionId == null) return res.sendStatus(401);
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
});

app.use("/admin", adminRouter);
app.use("/user", userRouter);
