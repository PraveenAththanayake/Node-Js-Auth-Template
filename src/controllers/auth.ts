import { Response, Request } from "express";
import User from "../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

type RequestBody = {
  name: string;
  email: string;
  password: string;
};

export const registerUser = async (req: Request, res: Response) => {
  const { name, email, password }: RequestBody = req.body;

  //hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //store the user in the database
  const user = new User({
    name: name,
    email: email,
    password: hashedPassword,
  });
  try {
    await user.save();
    res.send({ user: user._id });
  } catch (error) {
    res.status(400).send(error);
  }
};

export const loginUser = async (req: Request, res: Response) => {
  //create and assign a JWT
  if (!process.env.JWT_SECRET) {
    return res.status(500).send("JWT_SECRET is not defined");
  }

  const token = jwt.sign({ id: req.userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  res.header("Authorization", `Bearer ${token}`).send(token);
};
