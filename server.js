const express = require("express");
// const bodyParser = require("body-parser"); /* deprecated */
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:3000",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json()); /* bodyParser.json() is deprecated */

// parse requests of content-type - application/x-www-form-urlencoded
app.use(
  express.urlencoded({ extended: true })
); /* bodyParser.urlencoded() is deprecated */

const db = require("./app/models");

db.sequelize.sync();

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Stack application." });
});

require("./app/routes/user.routes")(app);
require("./app/routes/admin.routes")(app);
require("./app/routes/profile.routes")(app);
require("./app/routes/skill.routes")(app);
require("./app/routes/question.routes")(app);
require("./app/routes/post.routes")(app);

//static Images Folder
app.use("/Images", express.static("./Images"));

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
