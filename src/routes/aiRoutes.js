import express from "express";
import { enhanceResume } from "../controllers/aiController.js";

const router = express.Router();

router.post("/enhance-resume", enhanceResume);

export default router;