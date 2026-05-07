import { makeOpenRouterRequest } from '../lib/openrouter';
import { OcrResult } from './ocrService';
import { SopDocument } from '../types';

export const generateSop = async (ocrResults: OcrResult[], screenshotUrls: string[]): Promise<OcrDocumentResponse> => {
  
  let ocrTextPrompt = "OCR Text by Frame:\n";
  ocrResults.forEach(r => {
    if (r.text.trim()) {
      ocrTextPrompt += `[frameIndex ${r.frameIndex}]: ${r.text}\n`;
    }
  });

  const systemPrompt = `You are an expert technical writer. Analyze the following OCR text extracted from sequential screenshots of a screen recording workflow. Generate a professional SOP document.`;
  
  const userPrompt = `${ocrTextPrompt}\n\nGenerate a JSON response with this exact structure: { "title": string, "summary": string, "estimatedTime": string, "tags": string[], "steps": [{ "stepNumber": number, "instruction": string, "screenshotIndex": number }], "checklist": string[] }. Respond ONLY with valid JSON, no markdown fences.`;

  const messages = [
    { role: 'system', content: systemPrompt },
    { role: 'user', content: userPrompt }
  ];

  const responseText = await makeOpenRouterRequest(messages);
  
  try {
    const rawContent = responseText.choices[0].message.content;
    let jsonContent = rawContent;
    if (jsonContent.startsWith('```json')) {
      jsonContent = jsonContent.replace(/```json\n?/, '').replace(/```\n?$/, '');
    } else if (jsonContent.startsWith('```')) {
      jsonContent = jsonContent.replace(/```\n?/, '').replace(/```\n?$/, '');
    }
    
    const parsed = JSON.parse(jsonContent);
    return parsed;
  } catch (error) {
    console.error("Failed to parse AI response:", error);
    throw new Error('Failed to generate valid SOP structure from AI');
  }
};

interface OcrDocumentResponse {
  title: string;
  summary: string;
  estimatedTime: string;
  tags: string[];
  steps: {
    stepNumber: number;
    instruction: string;
    screenshotIndex: number;
  }[];
  checklist: string[];
}
