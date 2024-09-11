import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import bcrypt from "bcryptjs";
import User from "../models/User";

type RequestBody = {
  email: string;
  password: string;
};

//zod validation
const loginSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(6),
  })
  .strict();

export const logiValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //validating using zod
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).send(parsed.error);
  } else {
    const { email: emailFromBody, password }: RequestBody = req.body;
    //check if the email exists
    const user = await User.findOne({ email: emailFromBody });
    if (user) {
      //check if the password is correct
      const validPass = await bcrypt.compare(password, user.password);
      if (validPass) {
        req.userId = user._id as string;
        next();
      } else {
        res.status(400).send("Invalid password");
      }
    } else {
      res.status(400).send("Email does not exist");
    }
  }
};
