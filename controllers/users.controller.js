const asyncWrapper = require("../middlewares/asyncWrapper");
const User = require("../models/user.model");
const httpStatusText = require("../utils/httpStatusText");
const appError = require("../utils/appError");

const getAllUsers = asyncWrapper(async (req, res) => {
  const query = req.query;

  const limit = query.limit || 10;
  const page = query.page || 1;
  const skip = (page - 1) * limit;
  // get all courses from database using Course
  const users = await User.find({}, { __v: false }).limit(limit).skip(skip);

  res.json({ status: httpStatusText.SUCCESS, data: { users } });
});

const register = asyncWrapper(async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  if (oldUser) {
    const error = appError.create(
      "user already exists",
      404,
      httpStatusText.FAIL
    );
    return next(error);
  }

  const oldUser = await User.findOne({ email: email });

  const newUser = new User({
    firstName,
    lastName,
    email,
    password,
  });

  await newUser.save();

  res.status(201).json({
    status: httpStatusText.SUCCESS,
    data: { user: newUser },
  });
});

const login = () => {};

module.exports = {
  getAllUsers,
  register,
  login,
};
