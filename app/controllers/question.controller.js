const db = require("../models");
const Question = db.questions;

const multer = require("multer");
const path = require("path");

const createQuestion = (req, res) => {
  //validate post text in request
  if (!req.body.text) {
    res.status(400).send({
      message: "You should type something..! as question text",
    });
    return;
  }
  

  //create a question object
  let questions = {
    image: req.file.path,
    text: req.body.text,
    isRejected: req.body.isRejected ? req.body.isRejected : false,
  };

  //save question in to database
  Question.create(questions)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Question",
      });
    });
};
//-------------------------------------get question response----------
const findQuestion = async (req, res) => {
  let question = await Question.findAll({
    attributes: ["id", "image", "text", "createdAt"],
    where: { isRejected: 0 },
  });
  res.status(200).send(question);
};
//-------------------------------------get rejected question response----------
const findRejectQuestion = async (req, res) => {
  let question = await Question.findAll({
    attributes: ["id", "image", "text", "createdAt"],
    where: { isRejected: 1 },
  });
  res.status(200).send(question);
};
//-------------------------------- Update As Approved Question -------------------------------------------------
const updateAsApprovedQuestion = (req, res) => {
  const id = req.params.id;

  Question.update(
    { isRejected: 0 },
    {
      where: { id: id },
    }
  ).then((num) => {
    if (num == 1) {
      res.send({
        message: "Question Approved",
      });
    } else {
      res.send({
        message: `Cannot Approved Question with id=${id}. Maybe User was not found or req.body is empty!`,
      });
    }
  });
};
//-------------------------------- Update As Rejected Question -------------------------------------------------
const updateAsRejectedQuestion = (req, res) => {
  const id = req.params.id;

  Question.update(
    { isRejected: 1 },
    {
      where: { id: id },
    }
  ).then((num) => {
    if (num == 1) {
      res.send({
        message: "Question Approved",
      });
    } else {
      res.send({
        message: `Cannot Approved Question with id=${id}. Maybe User was not found or req.body is empty!`,
      });
    }
  });
};
// ------------------------------------------delete question-------------
const deleteQuestion = async (req, res) => {
  const id = req.params.id;

  Question.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Question was deleted",
        });
      } else {
        res.send({
          message: "Cannot delete question",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "could not delete question",
      });
    });
};

//-----------------------------------------update question -----------------------------
const updateQuestion = (req, res) => {
  const id = req.params.id;

  Question.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        return res.json("question was update successfully");
      } else {
        return res.json("Cannot update question");
      }
    })
    .catch((err) => {
      return res.status(500).json("error updating question");
    });
};

//Upload Image Controller ----------------------------------------

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Images/QuestionImage");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: "10000000" }, //updto 10Mb
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png/;
    const mimeType = fileTypes.test(file.mimetype); //Check File Type
    const extname = fileTypes.test(path.extname(file.originalname)); //check File Type

    if (mimeType && extname) {
      return cb(null, true);
    }
    cb("Give proper files formate to upload");
  },
}).single("image");
//DB column name{.array("newsImage,3")<--3image at one time}

module.exports = {
  createQuestion,
  upload,
  findQuestion,
  findRejectQuestion,
  deleteQuestion,
  updateQuestion,
  updateAsApprovedQuestion,
  updateAsRejectedQuestion,
};
