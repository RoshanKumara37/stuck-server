module.exports = (app) => {
  const post = require("../controllers/post.controller.js");

  var router = require("express").Router();

  router.post("/createPost", post.upload, post.createPost);
  router.get("/findPendingPost", post.findPendingPost);
  router.get("/findApprovedPost", post.findApprovedPost);
  router.get("/findRejectedPost", post.findRejectedPost);
  router.put("/updateAsPendingPost/:id", post.updateAsPendingPost);
  router.put("/updateAsApprovedPost/:id", post.updateAsApprovedPost);
  router.put("/updateAsRejectedPost/:id", post.updateAsRejectedPost);
  router.get("/filterMathScience", post.filterMathScience);
  router.get("/filterICT", post.filterICT);
  router.get("/filterBioTech", post.filterBioTech);
  router.get("/filterCivilTech", post.filterCivilTech);
  router.get("/filterMechanical", post.filterMechanical);
  router.get("/filterOther", post.filterOther);

  app.use("/api/user/post", router);
};
