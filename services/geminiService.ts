import { GoogleGenAI } from "@google/genai";

// Initialize the API client
const apiKey = process.env.API_KEY || ''; 
// Note: In a real production app, ensure API_KEY is handled via a proxy or securely. 
// For this demo, we assume the environment variable is injected.

const ai = new GoogleGenAI({ apiKey });

export const getPlanetFact = async (planetName: string): Promise<string> => {
  if (!apiKey) {
    return "API Key not configured. Please check metadata.json or environment setup.";
  }

  try {
    const prompt = `Tell me a fascinating, scientific, yet easy-to-understand fact about the planet ${planetName} in Chinese (Simplified). Keep it under 60 words.`;
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "暂无数据";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "无法连接到 AI 知识库。";
  }
};
