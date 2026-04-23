import express from "express";
import { enhanceResume, enhanceField } from "../controllers/aiController.js";

const router = express.Router();

router.post("/enhance-resume", enhanceResume);
router.post("/enhance-field", enhanceField);

export default router;