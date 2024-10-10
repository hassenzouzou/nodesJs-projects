const express = require("express");

const app = express();

app.use(express.json());

const courses = [
  {
    id: 1,
    title: "js course",
    price: 1000,
  },
  {
    id: 2,
    title: "react course",
    price: 800,
  },
];

// get All courses
app.get("/api/courses", (req, res) => {
  res.json(courses);
});

// get single course
app.get("/api/courses/:courseId", (req, res) => {
  const courseId = +req.params.courseId;

  const course = courses.find((course) => course.id === courseId);
  if (!course) {
    return res.status(404).json({ msg: "course not found" });
  }
  res.json(course);
});

app.post("/api/courses", (req, res) => {
  console.log(req.body);
  if (!req.body.title) {
    return res.status(400).json({ error: "title not set" });
  }
  if (!req.body.price) {
    return res.status(400).json({ error: "price not set" });
  }

  courses.push({ id: courses.length + 1, ...req.body });

  res.status(201).json(courses);
});

app.listen(5000, () => {
  console.log("listening on port: 5000");
});
