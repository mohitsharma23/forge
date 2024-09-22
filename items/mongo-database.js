import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const URI = process.env.DB_STRING;

const connectToDB = () => {
  mongoose
    .connect(URI)
    .then(() => {
      console.log("DB connected");
    })
    .catch((err) => {
      console.log("Some error occured", err);
    });
};

export default connectToDB;
