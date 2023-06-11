const db = require("../models");
const Post = db.posts;

const multer = require("multer");
const path = require("path");

const createPost = (req, res) => {
  // Validate post text in request
  if (!req.body.text) {
    res.status(400).send({
      message: "Post text can not be empty!",
    });
    return;
  }
  if (req.body.image) {
    res.status(400).send({
      message: "Post image can not be empty!",
    });
    return;
  }

  // Create a Post Object
  let posts = {
    image: req.file.path,
    text: req.body.text,
    category: req.body.category,
    status: req.body.status ? req.body.status : 1,
  };

  // Save Post in the database
  Post.create(posts)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Post.",
      });
    });
};
//-------------------------------- See All Posts --------------------------------------------------------
// status --> 1 ( Pending )
// status --> 2 ( Approved )
// status --> 3 ( Rejected )
//-------------------------------- Find Pending Posts --------------------------------------------------
const findPendingPost = async (req, res) => {
  let post = await Post.findAll({
    attributes: ["id", "image", "text", "category", "status", "createdAt"],
    where: { status: 1 },
  });
  res.status(200).send(post);
};
//-------------------------------- Find Approved Posts --------------------------------------------------
const findApprovedPost = async (req, res) => {
  let post = await Post.findAll({
    attributes: ["id", "image", "text", "category", "status", "createdAt"],
    where: { status: 2 },
  });
  res.status(200).send(post);
};
//-------------------------------- Find Rejected Posts -------------------------------------------------
const findRejectedPost = async (req, res) => {
  let post = await Post.findAll({
    attributes: ["id", "image", "text", "category", "status", "createdAt"],
    where: { status: 3 },
  });
  res.status(200).send(post);
};
//-------------------------------- Update As Pending Posts -------------------------------------------------
const updateAsPendingPost = (req, res) => {
  const id = req.params.id;

  Post.update(
    { status: 1 },
    {
      where: { id: id },
    }
  ).then((num) => {
    if (num == 1) {
      res.send({
        message: "Post added to Pending Level",
      });
    } else {
      res.send({
        message: `Cannot add Pending Level Post  with id=${id}. Maybe User was not found or req.body is empty!`,
      });
    }
  });
};
//-------------------------------- Update As Approved Posts -------------------------------------------------
const updateAsApprovedPost = (req, res) => {
  const id = req.params.id;

  Post.update(
    { status: 2 },
    {
      where: { id: id },
    }
  ).then((num) => {
    if (num == 1) {
      res.send({
        message: "Post Approved",
      });
    } else {
      res.send({
        message: `Cannot Approved Post with id=${id}. Maybe User was not found or req.body is empty!`,
      });
    }
  });
};
//-------------------------------- Update As Rejected Posts -------------------------------------------------
const updateAsRejectedPost = (req, res) => {
  const id = req.params.id;

  Post.update(
    { status: 3 },
    {
      where: { id: id },
    }
  ).then((num) => {
    if (num == 1) {
      res.send({
        message: "Post Rejected",
      });
    } else {
      res.send({
        message: `Cannot Rejected Post with id=${id}. Maybe User was not found or req.body is empty!`,
      });
    }
  });
};

//---------------- Upload Image Controller -----------------------------

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Images/PostImages"); //Image Save Path
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
}).single("image"); //DB table colum name{.array("newsImage,3")<--3 image at one time}

//---------------- End of Upload Image Controller -----------------------------


//Filter post by category
const filterMathScience = async (req, res) => {
  let post = await Post.findAll({
    attributes: ["id", "image", "text", "category", "status", "createdAt"],
    where: { status: 2, category: "Maths Science" },
  });
  res.status(200).send(post);
};
const filterICT = async (req, res) => {
  let post = await Post.findAll({
    attributes: ["id", "image", "text", "category", "status", "createdAt"],
    where: { status: 2, category: "ICT" },
  });
  res.status(200).send(post);
};
const filterBioTech = async (req, res) => {
  let post = await Post.findAll({
    attributes: ["id", "image", "text", "category", "status", "createdAt"],
    where: { status: 2, category: "Bio Tech" },
  });
  res.status(200).send(post);
};
const filterCivilTech = async (req, res) => {
  let post = await Post.findAll({
    attributes: ["id", "image", "text", "category", "status", "createdAt"],
    where: { status: 2, category: "Civil Tech" },
  });
  res.status(200).send(post);
};
const filterMechanical = async (req, res) => {
  let post = await Post.findAll({
    attributes: ["id", "image", "text", "category", "status", "createdAt"],
    where: { status: 2, category: "Mechanical" },
  });
  res.status(200).send(post);
};
const filterOther = async (req, res) => {
  let post = await Post.findAll({
    attributes: ["id", "image", "text", "category", "status", "createdAt"],
    where: { status: 2, category: "Other" },
  });
  res.status(200).send(post);
};


module.exports = {
  createPost,
  findPendingPost,
  findApprovedPost,
  findRejectedPost,
  updateAsPendingPost,
  updateAsApprovedPost,
  updateAsRejectedPost,
  filterMathScience,
  filterICT,
  filterBioTech,
  filterCivilTech,
  filterMechanical,
  filterOther,
  upload,
};
