import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    mongoose
      .connect(process.env.DBConnectionString)
      .then(() => {
        app.listen(process.env.PORT, () => {
          console.log(`Server running on port: ${process.env.PORT}`);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    process.exit(1);
    console.log(error);
  }

  // mongoose
  //   .connect(process.env.DBConnectionString)
  //   .then(() => {
  //     app.listen(process.env.PORT, () => {
  //       console.log(`Server running on port: ${process.env.PORT}`);
  //     });
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });
};

export default connectDB;
