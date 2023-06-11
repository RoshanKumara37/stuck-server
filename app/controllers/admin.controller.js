const db = require("../models");
const News = db.newses;
const User = db.users;
// import require for image Upload
const multer = require("multer");
const path = require("path");
// ---------------------------------News Create---------------------------------------------------------
const createNews = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Title can not be empty!",
    });
    return;
  }
  if (!req.body.description) {
    res.status(400).send({
      message: "Description can not be empty!",
    });
    return;
  }

  // Create a News
  let news = {
    image: req.file.path,
    title: req.body.title,
    description: req.body.description,
  };

  // Save News in the database
  News.create(news)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the News.",
      });
    });
};
//-------------------------------- See Alll News --------------------------------------------------------
const getNews = async (req, res) => {
  let news = await News.findAll({});
  res.status(200).send(news);
};
//-------------------------------- Delete Selected News -------------------------------------------------
const deleteNews = (req, res) => {
  const id = req.params.id;

  News.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "News was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete News with id=${id}. Maybe News was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete News with id=" + id,
      });
    });
};
//-------------------------------- Find Admin Users -------------------------------------------------
const findAllAdmin = (req, res) => {
  User.findAll({
    attributes: [
      "id",
      "email",
      "first_name",
      "last_name",
      "mobile",
      "birthday",
    ],
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
const findAllUser = (req, res) => {
  User.findAll({
    attributes: [
      "id",
      "email",
      "first_name",
      "last_name",
      "mobile",
      "birthday",
    ],
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
const updateUserasAdmin = (req, res) => {
  const id = req.params.id;

  User.update(
    { isAdmin: 1 },
    {
      where: { id: id },
    }
  )
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "User was updated as Admin",
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
//-------------------------------- Update User As Admin ---------------------------------------------
const updateAdminasUser = (req, res) => {
  const id = req.params.id;

  User.update(
    { isAdmin: 0 },
    {
      where: { id: id },
    }
  )
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Admin was updated as User.",
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
//-------------------------------- Delete Selected User -------------------------------------------------
const deleteUser = (req, res) => {
  const id = req.params.id;

  User.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "User was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete User with id=${id}. Maybe User was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete User with id=" + id,
      });
    });
};
//---------------- Upload Image Controller -----------------------------

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Images/NewsImages"); //Image Save Path
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: "10000000" }, //Files size add using bytes {10MB}
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png/;
    const mimeType = fileTypes.test(file.mimetype); //Check File Type
    const extname = fileTypes.test(path.extname(file.originalname)); //Check File Type

    if (mimeType && extname) {
      return cb(null, true);
    }
    cb("Give proper files formate to upload");
  },
}).single("image"); //DB table colloum name{.array("newsImage,3")<--3 image at one time}

module.exports = {
  createNews,
  getNews,
  deleteNews,
  findAllAdmin,
  findAllUser,
  updateUserasAdmin,
  updateAdminasUser,
  deleteUser,
  upload,
};
