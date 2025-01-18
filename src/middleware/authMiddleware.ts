import express, { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const validateUser = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    throw new Error("Authorization denied, Please provide a token");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY || "") as {
      id: string;
    };
    req.body.userId = decoded.id;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Token is not valid",
      error,
    });
  }
};

export default validateUser;
