import OpenAI from "openai";

export const generateResumeSummary = async ({ skills, experience, role, projects }) => {
  try {
    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: `
You are a professional resume writer.

Create a short ATS-friendly resume summary.

Role: ${role}
Skills: ${skills}
Experience: ${experience}
Projects: ${projects}

Make it impactful, concise, and professional.
          `,
        },
      ],
    });

    return response.choices[0].message.content;

  } catch (error) {
    console.log("AI failed, using fallback");

    return `Professional ${role} with experience in ${skills}. Strong background in ${experience}. Worked on projects like ${projects}. Highly motivated and results-driven.`;
  }
};