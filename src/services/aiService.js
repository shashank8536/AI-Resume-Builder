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