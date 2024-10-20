require("dotenv").config();
const express = require("express");

const cors = require("cors");

const app = express();

const mongoose = require("mongoose");

const httpStatusText = require("./utils/httpStatusText");

const url = process.env.MONGO_URL;

mongoose.connect(url).then(() => {
  console.log("mongodb sever start");
});

app.use(cors());
app.use(express.json());

const coursesRouter = require("./routes/courses.route");

app.use("/api/courses", coursesRouter);

app.all("*", (req, res) => {
  return res.status(404).json({
    status: httpStatusText.ERROR,
    data: { message: "This resource is not available" },
  });
});

app.use((error, req, res, next) => {
  res.status(error.statusCode || 500).json({
    status: error.statusText || httpStatusText.ERROR,
    message: error.message || "Internal Server Error",
    code: error.statusCode || 500,
    data: null,
  });
});

app.listen(process.env.PORT || 5000, () => {
  console.log("listening on port: 5000");
});
