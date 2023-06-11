module.exports = (app) => {
  const skill = require("../controllers/skill.controller.js");
  const signIn = require("../controllers/login.controllr");

  var router = require("express").Router();

  // Retrieve all skills
  router.get("/", skill.findAll);

  // // Retrieve a single skill with id
  router.get("/:id", skill.findOne);

  // // Retrieve a single profile with id
  router.get("/findByProfileId/:id", skill.findByProfileId);

  app.use("/api/skill", router);
};
