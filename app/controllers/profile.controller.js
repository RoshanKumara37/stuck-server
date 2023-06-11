const db = require("../models");
const Profile = db.profiles;
const { check, validationResult } = require("express-validator");
const Op = db.Sequelize.Op;
var bcrypt = require("bcryptjs");
//const { validateToken } = require("../middlewares/AuthMiddleware");

// Retrieve all profiles from the database.
exports.findAll = (req, res) => {
  const email = req.query.email;
  var condition = email ? { email: { [Op.like]: `%${email}%` } } : null;

  Profile.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message || "Some error occurred while retrieving profiles.",
      });
    });
};

// Find a single profile with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Profile.findByPk(id)
    .then((data) => {
      if (data) {
        return res.send(data);
      } else {
        return res.status(404).send({
          message: `Cannot find Profile with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      return res.status(500).send({
        message: "Error retrieving Profile with id=" + id,
      });
    });
};

// Find a single profile with an id
exports.findByUserId = (req, res) => {
  const id = req.params.id;
  // return res.send(userId);

  Profile.findOne({where : {userId : id}})
    .then((data) => {
      if (data) {
        return res.send(data);
      } else {
        return res.status(404).send({
          message: `Cannot find Profile with userId=${id}.`,
        });
      }
    })
    .catch((err) => {
      return res.status(500).send({
        message: "Error retrieving Profile with userId=" + id,
      });
    });
};