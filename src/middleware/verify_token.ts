import { Request, Response, NextFunction } from "express";

import jwt from "jsonwebtoken";

export const verify = (req: Request, res: Response, next: NextFunction) => {
  const auth = req.header("Authorization");
  if (!auth) return res.status(401).send("Access Denied");
  let token = auth.split(" ")[1];
  if (!token) return res.status(401).send("Access Denied");
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET as string);
    req.body = verified;
    next();
  } catch (error) {
    res.status(400).send("Invalid Token");
  }
};
