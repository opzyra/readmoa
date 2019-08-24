import express from "express";
import check from "./check";

const router = express.Router();

router.use("/check", check);

export default router;
