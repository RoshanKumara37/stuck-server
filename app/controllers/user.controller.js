const db = require("../models");
const User = db.users;
const { check, validationResult } = require("express-validator");
const Op = db.Sequelize.Op;
var bcrypt = require("bcryptjs");
//const { validateToken } = require("../middlewares/AuthMiddleware");

// Create and Save a new User
exports.create = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const confirmpassword = req.body.confirmpassword;
  const mobile = req.body.mobile;
  const birthday = req.body.birthday;
  const gender = req.body.gender;
  const profession = req.body.profession;
  // Validate request
  if (!email) {
    return res.status(400).json("Email can not be empty!");
  }
  if (!password) {
    return res.status(400).json("Password can not be empty!");
  }
  if (password != confirmpassword) {
    return res.status(400).json("Confirm password not match!");
  }
  if (!validEmail(email)) {
    return res.status(400).json("This email is not valid email address!");
  }
  if (!validPassword(password)) {
    return res.status(400).json("This password is not valid password!");
  }
  if (!validMobile(mobile)) {
    return res.status(400).json("Mobile Number is not valid");
  }
  if (!birthday) {
    return res.status(400).json("birthday can not be empty!");
  }
  if (!gender) {
    return res.status(400).json("gender can not be empty!");
  }
  if (!profession) {
    return res.status(400).json("profession can not be empty!");
  }
  //Email validate in DB
  User.findOne({
    where: {
      // Save User in the database
      email: email,
    },
  }).then((user) => {
    if (user) {
      return res.status(400).json("Failed! This email is already in use!");
    } else {
      // Create a User
      const user = {
        email: email,
        password: bcrypt.hashSync(password, 8),
        isAdmin: req.body.isAdmin ? req.body.isAdmin : false,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        mobile: req.body.mobile,
        birthday: req.body.birthday,
        gender: req.body.gender,
        profession: req.body.profession,
      };
      // Save User in the database
      User.create(user)
        .then((data) => {
          return res.status(200).json({"message" : "Thanks for join with our commiunity", "user" : data });
        })
        .catch((err) => {
          return res
            .status(500)
            .json("Some error occurred while creating the User.");
        });
    }
  });
};

// Retrieve all Users from the database.
exports.findAll = (req, res) => {
  const email = req.query.email;
  var condition = email ? { email: { [Op.like]: `%${email}%` } } : null;

  User.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message || "Some error occurred while retrieving users.",
      });
    });
};

// Find a single User with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  User.findByPk(id)
    .then((data) => {
      if (data) {
        return res.send(data);
      } else {
        return res.status(404).send({
          message: `Cannot find User with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      return res.status(500).send({
        message: "Error retrieving User with id=" + id,
      });
    });
};

// Update a User by the id in the request(Update Admin or whole user)
exports.update = (req, res) => {
  const id = req.params.id;

  User.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        return res.json("User was updated successfully.");
      } else {
        return res.json(
          `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`
        );
      }
    })
    .catch((err) => {
      return res.status(500).json("Error updating User with id=" + id);
    });
};

// update password successfully. done by - Yathu
exports.updatePassword = async (req, res) => {
  const email = req.params.email;
  const newPassword = req.body.newPassword;
  const confirmpassword = req.body.confirmpassword;
  const oldPassword = req.body.oldPassword;
  const userfromdb = await User.findOne({ where: { email: email } })

  // check if user is available or not.
  if(userfromdb){
    // check newPassword and confirmpassword is correct
    if(newPassword != confirmpassword){
      return res.status(400).json({"Message" : "Password is not match!"});
    }
    if (!validPassword(newPassword)) {
      return res.status(400).json("This password is not valid password!");
    }
    // Old password and new password check
    else if (!bcrypt.compareSync(oldPassword, userfromdb.password)) {
      return res.status(400).json({"Message" : "password check failed"});
    }
    
      //update password to Database
      User.update(
        { password:  bcrypt.hashSync(newPassword, 8) },
        { where: { id: userfromdb.id  } }
      ).then(count => {
        return res.status(200).json({"Message" : 'Password updated Successfully'});
      }).catch((err) => {
        return res.status(500).json("Error updating password with id=" + id);
      });
  } else {
    return res.status(400).json({"Message" : "User not found!"});
  }

};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  User.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        return res.send({
          message: "User was deleted successfully!",
        });
      } else {
        return res.send({
          message: `Cannot delete User with id=${id}. Maybe User was not found!`,
        });
      }
    })
    .catch((err) => {
      return res.status(500).send({
        message: "Could not delete User with id=" + id,
      });
    });
};

// Delete all Users from the database.
exports.deleteAll = (req, res) => {
  User.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      return res.send({
        message: `${nums} Tutorials were deleted successfully!`,
      });
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message || "Some error occurred while removing all users.",
      });
    });
};

// find all Admins --> convert publish to isAdmin
exports.findAdmins = (req, res) => {
  User.findAll({ where: { isAdmin: 1 } })
    .then((data) => {
      return res.send(data);
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message || "Some error occurred while retrieving users.",
      });
    });
};

//-------------------------------- Find Admin Users -------------------------------------------------
 exports.findAllAdmin = (req, res) => {
  User.findAll({
    attributes: ["id", "email", "first_name", "last_name", "mobile", "gender"],
    where: { isAdmin: 1 },
  })
    .then((data) => {
      if (data) {
        return res.json(data);
      } else {
        return res.status(404).send({
          message: `Cannot find User with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      return res.status(500).send({
        message: "Error retrieving User with id= " + id,
      });
    });
};
//-------------------------------- Find Normal Users -------------------------------------------------
exports.findAllUser = (req, res) => {
  User.findAll({
    attributes: ["id", "email", "first_name", "last_name", "mobile", "gender"],
    where: { isAdmin: 0 },
  })
    .then((data) => {
      if (data) {
        return res.json(data);
      } else {
        return res.status(404).send({
          message: `Cannot find User with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      return res.status(500).send({
        message: "Error retrieving User with id= " + id,
      });
    });
};
//-------------------------------- Update User As Admin ---------------------------------------------
exports.updateUserAdmin = (req, res) => {
  const id = req.params.id;

  User.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "User was updated as Admin.",
        });
      } else {
        res.send({
          message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating User with id=" + id,
      });
    });
};





