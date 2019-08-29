import express, { Request, Response, NextFunction } from "express";
import { EntityManager } from "typeorm";

import { txrt } from "../core/txManager";

import PostOkky from "../model/PostOkky";
import PostVelog from "../model/PostVelog";
import PostBrunch from "../model/PostBrunch";
import PostTistory from "../model/PostTistory";
import PostGithub from "../model/PostGithub";
import PostMedium from "../model/PostMedium";

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

router.get(
  "/velog",
  txrt(
    async (
      req: Request,
      res: Response,
      next: NextFunction,
      em: EntityManager
    ) => {
      let { skip = 0 } = req.query;

      const [posts, postsCount] = await em.findAndCount(PostVelog, {
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

router.get(
  "/brunch",
  txrt(
    async (
      req: Request,
      res: Response,
      next: NextFunction,
      em: EntityManager
    ) => {
      let { skip = 0 } = req.query;

      const [posts, postsCount] = await em.findAndCount(PostBrunch, {
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

router.get(
  "/tistory",
  txrt(
    async (
      req: Request,
      res: Response,
      next: NextFunction,
      em: EntityManager
    ) => {
      let { skip = 0 } = req.query;

      const [posts, postsCount] = await em.findAndCount(PostTistory, {
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

router.get(
  "/github",
  txrt(
    async (
      req: Request,
      res: Response,
      next: NextFunction,
      em: EntityManager
    ) => {
      let { skip = 0 } = req.query;

      const [posts, postsCount] = await em.findAndCount(PostGithub, {
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

router.get(
  "/medium",
  txrt(
    async (
      req: Request,
      res: Response,
      next: NextFunction,
      em: EntityManager
    ) => {
      let { skip = 0 } = req.query;

      const [posts, postsCount] = await em.findAndCount(PostMedium, {
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
