import express, { Request, Response, NextFunction } from "express";
import { EntityManager } from "typeorm";

import { txrt } from "../core/txManager";

import PostOkky from "../model/PostOkky";

const router = express.Router();

router.get(
  "/okky",
  txrt(
    async (
      req: Request,
      res: Response,
      next: NextFunction,
      em: EntityManager
    ) => {
      const { skip = 0 } = req.query;

      const posts = await em.find(PostOkky, {
        order: { writed_at: "DESC" },
        skip,
        take: 20
      });

      res.json(posts);
    }
  )
);

export default router;
