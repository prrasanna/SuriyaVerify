// server.ts
import express, { type Request, type Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize GoogleGenAI client (backend only)
const aiClient = new GoogleGenAI({
  apiKey: process.env.API_KEY || '',
});

// Types
interface VerifyRequestBody {
  cityCode: string;
}

interface VerifyResponse {
  success: boolean;
  message: string;
  data?: any;
}

// /api/verify endpoint
app.post('/api/verify', async (req: Request, res: Response<VerifyResponse>) => {
  try {
    const { cityCode } = req.body as VerifyRequestBody;

    if (!cityCode) {
      return res.status(400).json({ success: false, message: 'cityCode is required' });
    }

    // Example AI call
    const aiResponse = await aiClient.generateText({
      model: 'gpt-4',
      prompt: `Verify city code: ${cityCode}`,
      max_output_tokens: 100,
    });

    return res.json({
      success: true,
      message: 'Verification completed',
      data: aiResponse.output_text,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
