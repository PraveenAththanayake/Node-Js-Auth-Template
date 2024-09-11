import { Request, Response, NextFunction } from "express";

import { z } from "zod";
import User from "../models/User";

//zod validation
const registerSchema = z
  .object({
    name: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(6),
  })
  .strict();

type RequestBody = {
  email: string;
};

export const registerValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //validate the request body
  const parsed = registerSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).send(parsed.error);
  } else {
    const { email: emailFromBody }: RequestBody = req.body;
    //check if the email already exists
    const emailExists = await User.findOne({ email: emailFromBody });
    if (emailExists) {
      res.status(400).send("Email already exists");
    } else {
      next();
    }
  }
};
