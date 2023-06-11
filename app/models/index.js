const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  // operatorsAliases: false,
  operatorsAliases: 0,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./user.model.js")(sequelize, Sequelize);
db.profiles = require("./profile.model.js")(sequelize, Sequelize);
db.skills = require("./skill.model.js")(sequelize, Sequelize);
db.questions = require("./question.models.js")(sequelize, Sequelize);
db.newses = require("./news.model.js")(sequelize, Sequelize);
db.posts = require("./post.model.js")(sequelize, Sequelize);

module.exports = db;
