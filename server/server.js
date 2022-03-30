const express = require("express");
const bodyParser = require("body-parser");
const appRoutes = require("./routes/appRoutes");

const app = express();

// middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

const PORT = process.env.PORT || 5000;

app.listen(PORT, function () {
  console.log(`App is running in http://localhost:${PORT}`);
});

app.get("/", (req, res) => {
  res.json({ message: "Hello" });
});

app.use(appRoutes);
