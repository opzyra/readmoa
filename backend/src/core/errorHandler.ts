import { Request, Response, NextFunction } from "express";
import logger from "./logger";

export const endpoint = (req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ message: "Not Found" });
};

export const error = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error(error.stack || "No stack message");
  res.status(500).json({ message: "System Error Occurred" });
};
