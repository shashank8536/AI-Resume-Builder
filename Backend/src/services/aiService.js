import OpenAI from "openai";

export const enhanceResumeData = async ({ skills, experience, role, projects }) => {
  try {
    const client = new OpenAI({
      baseURL: "https://api.groq.com/openai/v1",
      apiKey: process.env.OPENAI_API_KEY, 
    });

    const response = await client.chat.completions.create({
      model: "llama-3.1-8b-instant", 
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content: "You are an expert resume writer. Output ONLY a valid JSON object containing three string keys: 'experience', 'projects', and 'skills'. Take the user's input and enhance it into professional ATS-friendly bullet points using '•' characters. Extremely Important: If the input is already bullet-pointed, just fix typos/grammar WITHOUT duplicating or adding extra information.",
        },
        {
          role: "user",
          content: JSON.stringify({ role, skills, experience, projects }),
        },
      ],
    });

    return JSON.parse(response.choices[0].message.content);

  } catch (error) {
    console.log("AI failed, using fallback");
    
    // Prevent recursive compounding if the user clicks the button multiple times without an API key
    const cleanExperience = experience.startsWith('•') ? experience : `• Enhanced role: ${experience}\n• Led robust lifecycle development\n• Highly motivated and results-driven.`;
    const cleanProjects = projects.startsWith('•') ? projects : `• Enhanced: ${projects}\n• Architected and deployed scalable solutions`;

    return {
      experience: cleanExperience,
      projects: cleanProjects,
      skills: skills
    };
  }
};

export const enhanceSingleField = async ({ fieldName, text, role }) => {
  try {
    const client = new OpenAI({
      baseURL: "https://api.groq.com/openai/v1",
      apiKey: process.env.OPENAI_API_KEY, 
    });

    // Provide specific instructions based on the field type
    let fieldInstructions = "";
    if (fieldName === 'education') {
      fieldInstructions = "Format the education details cleanly inside a single line or maximum two simple lines (e.g., 'B.Tech in Computer Science - XYZ University (2020-2024)'). Do NOT use bullet points for education.";
    } else if (fieldName === 'projects') {
      fieldInstructions = "The user might only provide a project name. IMPORTANT: You MUST preserve the user's original project name on the very first line. Then, output EXACTLY 1 to 2 short bullet points (using '•') below it that briefly describe standard features of that project. DO NOT write a summary paragraph. DO NOT write an introduction or overview. DO NOT hallucinate massive details.";
    } else {
      fieldInstructions = "Enhance this into highly professional, ATS-friendly bullet points (using '•' character). Be MINIMAL but HIGHLY EFFECTIVE. Keep bullets very short, punchy, and action-oriented. Maximum 2-3 tight bullet points. DO NOT leave blank lines between bullet points.";
    }

    const response = await client.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content: `You are a strict code-like Resume formatting machine. Your ONLY job is to take the user's raw ${fieldName} text and output the final formatted text. ${fieldInstructions}
CRITICAL RULES:
1. NEVER include ANY conversational text, preambles, notes, explanations, or assumptions.
2. NEVER output double newlines (\\n\\n) or blank lines between bullets. Ensure all bullets sit exactly on the next consecutive line.
3. ONLY output the exact final string intended for the resume document. Anything else is a failure.`
        },
        {
          role: "user",
          content: text,
        },
      ],
    });

    return response.choices[0].message.content.trim();

  } catch (error) {
    console.log("AI failed for single field, using fallback");
    return fieldName === 'education' ? text : `• Enhanced ${fieldName}:\n• ${text}`;
  }
};