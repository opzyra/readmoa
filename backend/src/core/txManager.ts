import { getConnection } from "typeorm";
import { Request, Response, NextFunction } from "express";
import logger from "./logger";

export const txrt = (fn: Function) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const qrn = getConnection().createQueryRunner();
    const em = qrn.manager;

    await qrn.connect();
    await qrn.startTransaction();

    fn(req, res, next, em)
      .then(async () => {
        await qrn.commitTransaction();
      })
      .catch(async (error: Error) => {
        await qrn.rollbackTransaction();
        next(error);
      })
      .finally(async () => {
        await qrn.release();
      });
  };
};

export const txfn = (fn: Function) => {
  return async () => {
    const qrn = getConnection().createQueryRunner();
    const em = qrn.manager;

    await qrn.connect();
    await qrn.startTransaction();

    fn(em)
      .then(async () => {
        await qrn.commitTransaction();
      })
      .catch(async (error: Error) => {
        await qrn.rollbackTransaction();
        logger.error(error.stack || "No stack message");
      })
      .finally(async () => {
        await qrn.release();
      });
  };
};
