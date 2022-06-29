import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import bcrypt from "bcrypt";

export const Login = async (req, res) => {
  // const login = req.body;
  // const newLogin = new Login(login);

  const { email, password } = req.body;

  const emailExist = await User.findOne({ email: email });
  // const validPassword = await bcrypt.compare(password, emailExist.password);

  try {
    if (!emailExist) {
      res.send({ message: "This email is not available" });
    } else {
      // res.send({ message: "This email already available" });

      // if (validPassword) {
      //   // res.send({ message: "Invalid password" });
      //   const maxAge = 3 * 60 * 60;

      //   jwt.sign(
      //     { user: emailExist },
      //     process.env.ACCESS_TOKEN_SECRET_KEY,
      //     (err, token) => {
      //       res.json({ token: token });
      //     }
      //   );
      // }

      if (password === emailExist.password) {
        // res.send({ message: "Invalid password" });
        // const maxAge = 3 * 60 * 60;

        // jwt.sign(
        //   { user: emailExist },
        //   process.env.ACCESS_TOKEN_SECRET_KEY,
        //   { expiresIn: "30s" },
        //   (err, token) => {
        //     res.header("auth-token", token).send({ accessToken: token });
        //     // res
        //     //   .cookie("token", token, {
        //     //     httpOnly: true,
        //     //     secure: true,
        //     //     sameSite: "none",
        //     //     maxAge: 60 * 60 * 24 * 30 * 1000,
        //     //   })
        //     //   .send();
        //   }
        // );

        // jwt.sign(
        //   { user: emailExist },
        //   process.env.REFRESH_TOKEN_SECRET_KEY,
        //   { expiresIn: "1d" },
        //   (err, token) => {
        //     res.header("auth-token", token).send({ refreshToken: token });
        //     // res
        //     //   .cookie("token", token, {
        //     //     httpOnly: true,
        //     //     secure: true,
        //     //     sameSite: "none",
        //     //   })
        //     //   .send();
        //   }
        // );
        const token = jwt.sign(
          { user: emailExist },
          process.env.ACCESS_TOKEN_SECRET_KEY
        );
        res.header("auth-token", token).send({ accessToken: token });
      } else {
        res.send({ message: "Password didn't match" });
      }
    }
  } catch (error) {}

  /////////////////////

  // res.header("auth-token", { token: token }).send({ token: token });

  // const maxAge = 3 * 60 * 60;
  // const token = jwt.sign(
  //   { id: user._id, username },
  //   process.env.Token_SECRET_KEY,
  //   {
  //     expiresIn: maxAge, // 3hrs in sec
  //   }
  // );
  // res.cookie("jwt", token, {
  //   httpOnly: true,
  //   maxAge: maxAge * 1000, // 3hrs in ms
  // });

  // try {
  //   Login.findOne({ email: email }, (err, user) => {
  //     if (user) {
  //       if (password === user.password) {
  //         res.send({ message: "login sucess", user: user });
  //       } else {
  //         res.send({ message: "wrong credentials" });
  //       }
  //     } else {
  //       res.send("not register");
  //     }
  //   });
  // } catch (error) {
  //   res.status(409).json({
  //     message: error.message,
  //   });
  // }
};

export const verifyToken = (req, res, next) => {
  const token = req.header("auth-token");

  // Check for token
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    // Verify token
    const verified = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY);
    // Add user from payload
    req.user = verified;
    next();
  } catch (e) {
    res.status(400).json({ msg: "Token is not valid" });
  }

  // const authHeader = req.headers["authorization"];
  // const token = authHeader && authHeader.split(" ")[1];
  // if (token == null) return res.sendStatus(401);

  // jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY, (err, user) => {
  //   console.log(err);
  //   if (err) return res.sendStatus(403);
  //   req.body = user;
  //   next();
  // });
};
