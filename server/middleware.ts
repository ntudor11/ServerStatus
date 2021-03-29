import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Response, NextFunction } from "express";

export const secretKey = "TEMP_SECRET";

// JWT middleware for verifying user authentication and type
export const isAuth = (userType?: string | string[]) => (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const { token } = req.cookies;
  if (!token) {
    res.status(401).send({ error: "Unauthorized access: No token provided" });
  } else {
    jwt.verify(token, secretKey, (err: any, decoded: any) => {
      if (err) {
        res.status(401).send({ error: "Unauthorized: Invalid token" });
      } else if (userType && !userType.includes(decoded.type)) {
        next();
        res.status(401).send({ error: "Unauthorized: Invalid user type" });
      } else {
        req.userId = decoded.userId;
        req.email = decoded.email;
        req.type = decoded.type;
        next();
      }
    });
  }
};

// utility for hashing password strings
export const hashPass = (password: string) => {
  const passHash = bcrypt.hashSync(password, 10);
  return passHash;
};
