const express = require("express");
const bodyParser = require("body-parser");
const appRoutes = require("./routes/appRoutes");
const { Point, Comment } = require("./orm/sequelize");
var cors = require("cors");

const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

const PORT = process.env.PORT || 5000;

app.listen(PORT, function () {
  console.log(`App is running in http://localhost:${PORT}`);
});

app.get("/", (req, res) => {
  res.json({ message: "Hello" });
});
// try {
//   Point.create({ pointId: 33, imageId: 2, gridLocation: "5_23" }).then((re) =>
//     console.log(re)
//   );
// } catch (err) {
//   console.log(err);
// }
const c = async () => {
  try {
    const data = await Point.create({ imageId: 1111, gridLocation: "12" });
    console.log(data?.dataValues?.pointId);
  } catch (err) {
    console.log(err);
  }
};

// c();

app.use(appRoutes);
