module.exports = (app) => {
  const signUp = require("../controllers/user.controller.js");
  const signIn = require("../controllers/login.controllr");
  const { validateToken } = require("../middlewares/AuthMiddleware");
  var router = require("express").Router();

  // Create a new User
  router.post("/", signUp.create);

  // Retrieve all Users
  router.get("/", signUp.findAll);

  // Retrieve all isAdmin Users
  router.get("/isAdmin", signUp.findAllAdmin);

  // Retrieve a single User with id
  router.get("/:id", signUp.findOne);

  // Update a User with id
  router.put("/:id", signUp.update);

  // updatePassword - User with id
  router.put("/resetPassword/:email", signUp.updatePassword);

  // Delete a User with id
  router.delete("/:id", signUp.delete);

  // Delete all Users
  router.delete("/", signUp.deleteAll);

  //Login exists user -->
  router.post("/login", signIn.login);

  //-------------------------hasitha-----------------------------------------------

  router.get("/findAllAdmin", signUp.findAdmins);
  router.get("/findAllUser", signUp.findAllUser);
  router.put("/updateUserAdmin/:id", signUp.updateUserAdmin);
  //Authentication Routing
  router.get("/auth", validateToken, (req, res) => {
    res.json(req.user);
  });

  app.use("/api/user", router);
};
