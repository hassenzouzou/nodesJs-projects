const express = require("express");

const app = express();

const mongoose = require("mongoose");

const url =
  "mongodb+srv://hassenzouzou:nodejs_123@bluenodejs.derdz.mongodb.net/blueDB?retryWrites=true&w=majority&appName=blueNodejs";

mongoose.connect(url).then(() => {
  console.log("mongodb sever start");
});

app.use(express.json());

const coursesRouter = require("./routes/courses.route");

app.use("/api/courses", coursesRouter);

app.listen(5000, () => {
  console.log("listening on port: 5000");
});
