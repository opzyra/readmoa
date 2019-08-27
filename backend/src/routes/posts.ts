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
      let { skip = 0 } = req.query;

      const [posts, postsCount] = await em.findAndCount(PostOkky, {
        order: { writed_at: "DESC" },
        skip,
        take: 27
      });
      skip = parseInt(skip) + posts.length;
      const isNext = skip < postsCount;

      res.json({
        posts,
        skip,
        isNext
      });
    }
  )
);

export default router;
