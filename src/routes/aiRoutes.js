import express from "express";
import { createResumeSummary } from "../controllers/aiController.js";

const router = express.Router();

router.post("/resume-summary", createResumeSummary);

export default router;