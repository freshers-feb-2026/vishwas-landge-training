import AppError from "../utils/AppError.js";
import jwt from "jsonwebtoken";

export const isAuth = (req, res, next) => {

  const authHeader = req.get("Authorization");

  if (!authHeader) {
    return next(new AppError("User not authenticated", 401));
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return next(new AppError("Token missing", 401));
  }

  try {

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();

  } catch (err) {

    throw new AppError("Invalid or expired token", 401);

  }
};