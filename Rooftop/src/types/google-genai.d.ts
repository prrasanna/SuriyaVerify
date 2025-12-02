declare module '@google/genai' {
  export class GoogleGenAI {
    constructor(options: { apiKey: string });
    generateText(params: {
      model: string;
      prompt: string;
      max_output_tokens?: number;
    }): Promise<{ output_text: string }>;
  }
}
