
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateAIRoast = async (): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: "请用中文写一句关于‘李腾’的非常幽默、无害、夸张且可爱的‘大笨蛋’语录。注意：李腾是一个女孩子。字数在30字以内。要求脑洞大开，比如她干了什么傻萌的事。",
      config: {
        temperature: 0.9,
        topP: 0.95,
      }
    });

    return response.text?.trim() || "哎呀，AI 也被李腾的笨气传染了，生成失败！";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "李腾的笨已经超出了 AI 的计算能力范围！";
  }
};
