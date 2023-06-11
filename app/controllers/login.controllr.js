const db = require("../models");
const User = db.users;
const { check, validationResult } = require("express-validator");
const Op = db.Sequelize.Op;
var bcrypt = require("bcryptjs");
const { PASSWORD } = require("../config/db.config");
const { validateToken } = require("../middlewares/AuthMiddleware");
const { sign } = require("jsonwebtoken");

exports.login = function (req, res) {
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({
    where: {
      email: req.body.email,
    },
  }).then(function (user) {
    if (!user) {
      res.status(400).send({
        message: "User invalid user email or password",
      });
    } else {
      bcrypt.compare(password, user.password, function (err, result) {
        if (result == true) {
          const accessToken = sign(
            { email: user.email, id: user.id },
            "importantsecret"
          );
          res.json({
            token: accessToken,
            username: email,
            id: user.id,
            isAdmin: user.isAdmin,
          });
        } else {
          res.status(400).send({
            message: "User invalid user email or password",
          });
          //res.redirect('/');
        }
      });
    }
  });
};

//-----------------------------------------------------
//login page: storing and comparing email and password,and redirecting to home page after login
//app.post("/user");
