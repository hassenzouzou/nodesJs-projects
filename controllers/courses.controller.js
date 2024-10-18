const { validationResult } = require("express-validator");
const Course = require("../models/course.model");

const getAllCourses = async (req, res) => {
  // get all courses from database using Course
  const courses = await Course.find();
  res.json(courses);
};

const getCourse = async (req, res) => {
  const course = await Course.findById(req.params.courseId);

  if (!course) {
    return res.status(404).json({ msg: "course not found" });
  }
  res.json(course);
};

const addCourse = async (req, res) => {
  const erros = validationResult(req);
  if (!erros.isEmpty()) {
    return res.status(400).json(erros.array());
  }

  const newCourse = new Course(req.body);

  await newCourse.save();

  res.status(201).json(newCourse);
};

const updateCourse = async (req, res) => {
  const courseId = req.params.courseId;
  try {
    const updatedCourse = await Course.updateOne(
      { _id: courseId },
      {
        $set: { ...req.body },
      }
    );
    return res.status(200).json(updatedCourse);
  } catch (e) {
    return res.status(400).json({ error: e });
  }
};

const deleteCourse = async (req, res) => {
  const data = await Course.deleteOne({ _id: req.params.courseId });

  res.status(200).json({ success: true, msg: data });
};

module.exports = {
  getAllCourses,
  getCourse,
  addCourse,
  updateCourse,
  deleteCourse,
};
