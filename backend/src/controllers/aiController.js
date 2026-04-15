import { generateResumeSummary } from "../services/aiService.js";

export const createResumeSummary = async (req, res) => {
  try {
    const { skills, projects, experience, role } = req.body;

    if (!skills || !projects || !experience || !role) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const summary = await generateResumeSummary({
      skills,
      projects,
      experience,
      role,
    });

    res.json({ success: true, summary });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};