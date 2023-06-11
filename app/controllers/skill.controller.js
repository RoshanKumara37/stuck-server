const db = require("../models");
const Skill = db.skills;
const { check, validationResult } = require("express-validator");
const Op = db.Sequelize.Op;
var bcrypt = require("bcryptjs");
//const { validateToken } = require("../middlewares/AuthMiddleware");

// Retrieve all skills from the database.
exports.findAll = (req, res) => {
  const email = req.query.email;
  var condition = email ? { email: { [Op.like]: `%${email}%` } } : null;

  Skill.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message || "Some error occurred while retrieving skills.",
      });
    });
};

// Find a single User with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Skill.findByPk(id)
    .then((data) => {
      if (data) {
        return res.send(data);
      } else {
        return res.status(404).send({
          message: `Cannot find Skill with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      return res.status(500).send({
        message: "Error retrieving Skill with id=" + id,
      });
    });
};

// Find a single profile with an find By Profile Id
exports.findByProfileId = (req, res) => {
  const id = req.params.id;
  // return res.send(userId);

  Skill.findOne({where : {profileId : id}})
    .then((data) => {
      if (data) {
        return res.send(data);
      } else {
        return res.status(404).send({
          message: `Cannot find Profile with profileId=${id}.`,
        });
      }
    })
    .catch((err) => {
      return res.status(500).send({
        message: "Error retrieving Profile with profileId=" + id,
      });
    });
};
