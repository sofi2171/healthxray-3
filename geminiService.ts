import { GoogleGenAI, Type } from "@google/genai";

const getApiKey = () => process.env.API_KEY || "";

const getSelectedLanguage = () => {
  const lang = localStorage.getItem('hxray_lang') || 'en';
  const names = { en: 'English', ur: 'Urdu', hi: 'Hindi' };
  return names[lang as keyof typeof names];
};

export const getAIHealthAdvice = async (prompt: string, context?: string) => {
  const ai = new GoogleGenAI({ apiKey: getApiKey() });
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview', 
      contents: prompt,
      config: {
        systemInstruction: `You are HealthXRay AI. Respond in ${getSelectedLanguage()}. Provide clinical-grade health advice with search grounding.`,
        tools: [{ googleSearch: {} }]
      },
    });
    return { 
      text: response.text || "", 
      sources: response.candidates?.[0]?.groundingMetadata?.groundingChunks?.map((c: any) => ({
        title: c.web?.title || "Source",
        uri: c.web?.uri
      })).filter((s: any) => s.uri) || [] 
    };
  } catch (error) {
    return { text: "AI Service Error. Check API Key.", sources: [] };
  }
};

export const getNutritionPlan = async (goal: string, dietPref: string) => {
  const ai = new GoogleGenAI({ apiKey: getApiKey() });
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Create a nutrition plan for ${goal}. Language: ${getSelectedLanguage()}.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            breakfast: { type: Type.STRING },
            lunch: { type: Type.STRING },
            dinner: { type: Type.STRING },
            snacks: { type: Type.ARRAY, items: { type: Type.STRING } },
            tips: { type: Type.ARRAY, items: { type: Type.STRING } }
          },
          required: ["breakfast", "lunch", "dinner", "snacks", "tips"]
        }
      }
    });
    return JSON.parse(response.text || "{}");
  } catch (error) {
    return { breakfast: "Error", lunch: "", dinner: "", snacks: [], tips: [] };
  }
};

export const getExercisePlan = async (goal: string, level: string, equipment: string) => {
  const ai = new GoogleGenAI({ apiKey: getApiKey() });
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Create a workout routine for ${goal}. Language: ${getSelectedLanguage()}.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            routineName: { type: Type.STRING },
            exercises: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  sets: { type: Type.STRING },
                  reps: { type: Type.STRING },
                  intensity: { type: Type.STRING },
                  duration: { type: Type.STRING },
                  restPeriod: { type: Type.STRING },
                  instruction: { type: Type.STRING }
                },
                required: ["name", "sets", "reps", "intensity", "duration", "restPeriod", "instruction"]
              }
            },
            warmup: { type: Type.STRING },
            cooldown: { type: Type.STRING },
            proTips: { type: Type.ARRAY, items: { type: Type.STRING } }
          },
          required: ["routineName", "exercises", "warmup", "cooldown", "proTips"]
        }
      }
    });
    return JSON.parse(response.text || "{}");
  } catch (error) {
    return { routineName: "Error", exercises: [], warmup: "", cooldown: "", proTips: [] };
  }
};