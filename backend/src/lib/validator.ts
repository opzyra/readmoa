import Joi, { SchemaMap } from "@hapi/joi";
import { Request, Response, NextFunction } from "express";

export const validateQuery = (joi: SchemaMap) => {
  const schema = Joi.object().keys(joi);
  return (req: Request, res: Response, next: NextFunction) => {
    const result = Joi.validate(req.query, schema);
    if (result.error) {
      res.status(400).json({ message: "validateError", payload: result.error });
      return;
    }
    next();
  };
};
