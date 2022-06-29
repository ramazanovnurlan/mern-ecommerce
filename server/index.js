import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import multer from "multer";

// import connectDB from "./database/db.js";
import registerRoutes from "./routers/register.js";
import loginRoutes from "./routers/login.js";
import productRoutes from "./routers/products.js";
import userRoutes from "./routers/users.js";
import { verifyToken } from "./controllers/loginController.js";

const app = express();
dotenv.config();

//middlewares
app.use(express.json());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
const upload = multer({ dest: "uploads/" });

//database connection
// connectDB();

app.use("/api/admin-register", registerRoutes);
app.use("/api/admin-login", loginRoutes);

app.use("/api/products", productRoutes);
app.use("/api/account", userRoutes);
app.get("/api/protected", verifyToken, (req, res) => {
  res.send({ message: "daxil oldu" });
});

app.post("/upload", upload.single("productImage"), (req, res) => {
  req.send("success", req.file);
  console.log(req.file);
});

//
app.get("/nese", (req, res) => {
  res.send({ message: "nese" });
});

mongoose
  .connect(process.env.DB_CONNECTION_URL)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port: ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
