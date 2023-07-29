import { Request, Response, NextFunction } from "express";
import jwt, { Secret, JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET: string | undefined = process.env.JWT_SECRET;

interface RequestWithUID extends Request {
  uid?: string;
}

interface MyJwtPayload extends JwtPayload {
  uid: string;
}

export const requireToken = (req: RequestWithUID, res: Response, next: NextFunction) => {
  try {
    let token = req.headers?.authorization;

    if (!token) throw new Error("Token does not exist, use bearer");

    token = token.split(" ")[1];

    const payload = jwt.verify(token, JWT_SECRET as Secret) as MyJwtPayload;

    req.uid = payload.uid;

    next();
  } catch (error: any) {
    return res.status(401).json({ error: error.message });
  }
};

