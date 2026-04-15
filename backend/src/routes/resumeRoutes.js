import express from "express";
import Resume from "../models/resume.js";
import auth from "../middleware/authMiddleware.js";

const router = express.Router();

// CREATE
router.post("/create", auth, async (req, res) => {
  try {
    const { name, email, phone, education, skills, experience, project } = req.body;

    const resume = new Resume({
      userId: req.user.id,
      name,
      email,
      phone,
      education,
      project,
      skills: skills.split(","),
      experience,
    });

    await resume.save();

    res.json({ message: "Resume saved", resume });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET
router.get("/my", auth, async (req, res) => {
  try {
    const resume = await Resume.find({ userId: req.user.id });
    res.json(resume);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE
router.put("/update/:id", auth, async (req, res) => {
  try {
    const updated = await Resume.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE
router.delete("/delete/:id", auth, async (req, res) => {
  try {
    await Resume.findByIdAndDelete(req.params.id);
    res.json({ msg: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;