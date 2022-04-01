const Sequelize = require("sequelize");

const PointModel = require("../models/Point");
const CommentModel = require("../models/Comment");

const {
  DATABASE_NAME,
  USERNAME,
  PASSWORD,
  HOST,
  DIALECT,
  PORT,
} = require("../constants/db");

const sequelize = new Sequelize(DATABASE_NAME, USERNAME, PASSWORD, {
  host: HOST,
  dialect: DIALECT,
  port: PORT,
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});
const Point = PointModel(sequelize, Sequelize);
const Comment = CommentModel(sequelize, Sequelize);

sequelize
  .sync({ force: false })
  .then(() => {
    console.log(`Database & tables created here!`);
  })
  .catch((err) => console.log(err));

module.exports = { Point, Comment };
