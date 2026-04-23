import { enhanceResumeData, enhanceSingleField } from "../services/aiService.js";

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

export const enhanceField = async (req, res) => {
  try {
    const { fieldName, text, role } = req.body;

    if (!fieldName || !text) {
      return res.status(400).json({
        message: "fieldName and text are required",
      });
    }

    const enhancedText = await enhanceSingleField({
      fieldName,
      text,
      role,
    });

    res.json({ success: true, enhancedText });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};