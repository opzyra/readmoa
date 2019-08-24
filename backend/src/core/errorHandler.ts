import { Request, Response, NextFunction } from "express";

const endpoint = (req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ message: "잘못된 접근 입니다." });
};

const error = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(500).json({ message: "시스템 오류가 발생하였습니다." });
};

export { endpoint, error };
