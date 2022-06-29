import User from "../models/userModel.js";
import bcrypt from "bcrypt";

export const getAllRegisters = async (req, res) => {
  try {
    const registers = await Register.find();
    res.status(200).json(registers);
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

export const Register = async (req, res) => {
  // const register = req.body;
  // const newRegister = new Register(register);

  const { firstName, lastName, email, password, password2 } = req.body;

  const emailExist = await User.findOne({ email: email });
  // const salt = await bcrypt.genSalt(10);
  // const passwordHash = await bcrypt.hash(password, salt);

  const user = new User({
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: password,
    password2: password2,
  });

  if (!firstName || !lastName || !email || !password || !password2) {
    res.status(400).json({ message: "Please enter all fields" });
  } else {
    try {
      if (emailExist) {
        res.send({ message: "user already exist" });
      } else {
        await user.save((err) => {
          if (err) {
            res.send(err);
          } else {
            res.send({ message: "successfully registered" });
          }
        });
        // res.status(201).json(user);
      }
    } catch (error) {}
  }

  // try {
  //   User.findOne({ email: email }, (err, user) => {
  //     if (user) {
  //       res.send({ message: "user already exist" });
  //     } else {
  //       // const user = new User({ email, password });
  //       // user.save((err) => {
  //       //   if (err) {
  //       //     res.send(err);
  //       //   } else {
  //       //     res.send({ message: "sucessfull" });
  //       //   }
  //       // });

  //       User.save();
  //       res.status(201).json(newUser);
  //     }
  //   });

  //   // await newUser.save();
  //   // res.status(201).json(newUser);
  // } catch (error) {
  //   res.status(409).json({
  //     message: error.message,
  //   });
  // }
};
