import { enhanceResumeData } from "../services/aiService.js";

export const enhanceResume = async (req, res) => {
  try {
    const { skills, projects, experience, role } = req.body;

    if (!skills || !projects || !experience || !role) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const enhancedData = await enhanceResumeData({
      skills,
      projects,
      experience,
      role,
    });

    res.json({ success: true, ...enhancedData });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};