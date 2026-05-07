import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const OPENROUTER_BASE_URL = process.env.OPENROUTER_BASE_URL || 'https://openrouter.ai/api/v1';
const OPENROUTER_MODEL = process.env.OPENROUTER_MODEL || 'deepseek/deepseek-chat';

const openRouterClient = axios.create({
  baseURL: OPENROUTER_BASE_URL,
  headers: {
    'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
    'HTTP-Referer': process.env.FRONTEND_URL || 'http://localhost:3000',
    'X-Title': 'FlowSOP AI',
    'Content-Type': 'application/json'
  }
});

export const makeOpenRouterRequest = async (messages: any[], retries = 3): Promise<any> => {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const response = await openRouterClient.post('/chat/completions', {
        model: OPENROUTER_MODEL,
        messages,
        response_format: { type: 'json_object' }
      });
      return response.data;
    } catch (error: any) {
      console.error(`OpenRouter Error (Attempt ${attempt}):`, error.response?.data || error.message);
      if (attempt === retries) throw error;
      await new Promise(res => setTimeout(res, attempt * 1000));
    }
  }
};
