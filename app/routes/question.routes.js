module.exports = (app) => {
  const question = require("../controllers/question.controller.js");
  var router = require("express").Router();

  router.post("/createQuestion", question.upload, question.createQuestion);
  router.get("/findQuestion", question.findQuestion);
  router.get("/findRejectQuestion", question.findRejectQuestion);
  router.delete("/deleteQuestion/:id", question.deleteQuestion);
  router.put("/updateQuestion/:id", question.updateQuestion);
  router.put(
    "/updateAsApprovedQuestion/:id",
    question.updateAsApprovedQuestion
  );
  router.put(
    "/updateAsRejectedQuestion/:id",
    question.updateAsRejectedQuestion
  );

  app.use("/api/user/question", router);
};
