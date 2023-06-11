module.exports = (app) => {
  const profile = require("../controllers/profile.controller.js");
  const signIn = require("../controllers/login.controllr");

  var router = require("express").Router();

  // Retrieve all profiles
  router.get("/", profile.findAll);

  // // Retrieve a single profile with id
  router.get("/:id", profile.findOne);

    // // Retrieve a single profile with id
    router.get("/findByUserId/:id", profile.findByUserId);


  app.use("/api/profile", router);
};
