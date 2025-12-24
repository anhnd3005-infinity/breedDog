import { GoogleGenAI, Type } from "@google/genai";
import { DogPersona, QuizAnswer } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const TEXT_MODEL = "gemini-3-flash-preview";
const IMAGE_MODEL = "gemini-2.5-flash-image";

export const generateDogPersona = async (name: string, answers: QuizAnswer[]): Promise<DogPersona> => {
  // Format answers for the prompt
  const answersText = answers.map(a => `- Question: "${a.questionText}" | User Answer: "${a.answerText}"`).join("\n");

  const prompt = `
    Analyze the user named "${name}" and their quiz answers regarding work style and personality to create a unique "Dog Persona" (Nhân cách chó).
    The response must be in Vietnamese (Tiếng Việt).

    User's Quiz Answers:
    ${answersText}
    
    Based on these behavioral answers (especially work style and social interaction), determine:
    - A creative dog "breed" name or title (e.g., "Golden Retriever Của Công Ty", "Husky Deadline", "Corgi Văn Phòng").
    - A color name and hex code representing their vibe (energy/aura).
    - A witty personality description matching their quiz choices, focusing on work ethic and social style.
    - 3 traits (adjectives).
    - A quote (funny or inspiring).
    - Best and Worst matches (can be other dog types or personality types).
  `;

  const response = await ai.models.generateContent({
    model: TEXT_MODEL,
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          breed: { type: Type.STRING },
          colorName: { type: Type.STRING },
          hexCode: { type: Type.STRING },
          personality: { type: Type.STRING },
          traits: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          },
          quote: { type: Type.STRING },
          bestMatch: { type: Type.STRING },
          worstMatch: { type: Type.STRING },
        },
        required: ["breed", "colorName", "hexCode", "personality", "traits", "quote", "bestMatch", "worstMatch"],
      },
    },
  });

  const text = response.text;
  if (!text) throw new Error("No text response from Gemini");
  
  return JSON.parse(text) as DogPersona;
};

export const generateDogImage = async (persona: DogPersona): Promise<string> => {
  const prompt = `
    A cute, high-quality, flat vector art sticker illustration of a dog that represents: ${persona.breed}.
    Main color theme: ${persona.colorName} (Hex: ${persona.hexCode}).
    Mood: ${persona.traits.join(", ")}.
    Style: Kawaii, vibrant colors, simple background, minimalistic, rounded shapes.
    Ensure the dog looks distinct and matches the description: ${persona.personality}.
    No text in the image.
  `;

  const response = await ai.models.generateContent({
    model: IMAGE_MODEL,
    contents: {
      parts: [{ text: prompt }]
    }
  });

  const parts = response.candidates?.[0]?.content?.parts;
  if (!parts) throw new Error("No image generated");

  for (const part of parts) {
    if (part.inlineData && part.inlineData.data) {
      return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
    }
  }

  throw new Error("Could not find image data in response");
};