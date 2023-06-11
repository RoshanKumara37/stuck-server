module.exports = (app) => {
  const admin = require("../controllers/admin.controller.js");

  var router = require("express").Router();

  router.post("/createNews", admin.upload, admin.createNews);
  router.get("/getNews", admin.getNews);
  router.get("/findAllAdmin", admin.findAllAdmin);
  router.get("/findAllUser", admin.findAllUser);
  router.put("/updateUserasAdmin/:id", admin.updateUserasAdmin);
  router.put("/updateAdminasUser/:id", admin.updateAdminasUser);
  router.delete("/deleteNews/:id", admin.deleteNews);
  router.delete("/deleteUser/:id", admin.deleteUser);

  app.use("/api/admin", router);
};
