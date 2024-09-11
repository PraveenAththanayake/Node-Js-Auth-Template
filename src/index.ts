import express from "express";
import { connectDB } from "./db/connect";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const port = process.env.PORT || 3000;

//middleware
app.use(express.json());

const start = async () => {
  try {
    const mongoUri = process.env.MONGO_URI;
    app.listen(port, () => console.log(`Server is running on port ${port}`));
    if (!mongoUri) {
      throw new Error("MONGO_URI is not defined in the environment variables");
    }
  } catch (error) {
    console.error(error);
  }
};

start();
