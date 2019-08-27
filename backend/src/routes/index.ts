import express from "express";
import check from "./check";
import posts from "./posts";

const router = express.Router();

router.use("/check", check);
router.use("/posts", posts);

export default router;
