import User from "../models/userModel.js";

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

export const addUser = async (req, res) => {
  const user = req.body;
  const newUser = new User(user);

  const existEmail = user.find((x) => x.email === user.email);

  if (existEmail == null) {
    try {
      await newUser.save();
      res.status(201).json(newUser);
    } catch (error) {
      res.status(409).json({
        message: error.message,
      });
    }
  } else {
    return "This email is already available";
  }
};

export const deleteUser = async (req, res) => {
  const user = req.body;
  const newUser = new User(user);

  try {
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(409).json({
      message: error.message,
    });
  }
};
