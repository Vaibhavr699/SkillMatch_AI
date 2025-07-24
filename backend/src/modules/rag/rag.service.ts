import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { CohereClient } from 'cohere-ai';

const cohere = new CohereClient({
  token: process.env.COHERE_API_KEY!,
});

interface ResumeAnalysis {
  skills: string[];
  score: number;
  suggestions: string;
}

@Injectable()
export class RagService {
  private HF_API_KEY = process.env.HF_API_KEY;
  private HF_HEADERS = { Authorization: `Bearer ${this.HF_API_KEY}` };

  // Use Cohere API for embeddings
  async getEmbedding(text: string): Promise<number[]> {
    try {
      const response = await cohere.embed({
        texts: [text],
        model: 'embed-english-v3.0',
        inputType: 'search_document', // camelCase as required by Cohere SDK
      });
      return response.embeddings[0];
    } catch (e: any) {
      console.error('Cohere embedding API error:', e.response?.data || e.message);
      throw new Error('Embedding failed: Cohere embedding API error');
    }
  }

  private async callCohereLLM(prompt: string): Promise<string> {
    try {
      const response = await cohere.generate({
        model: 'command',
        prompt,
        maxTokens: 512,
        temperature: 0.3,
      });
      return response.generations[0].text.trim();
    } catch (e: any) {
      console.error('Cohere API error:', e.response?.data || e.message);
      throw new Error('Cohere LLM API error');
    }
  }

  async analyzeResume(text: string): Promise<ResumeAnalysis> {
    const prompt = `
      Analyze the following resume and provide:
      1. A list of technical skills (as a JSON array)
      2. A score from 0-100 based on completeness, clarity, and professionalism. IMPORTANT: The score must reflect the actual content of the resume. Do NOT always return 85. Use a real score based on your analysis.
      3. Suggestions for improvement

      Resume:
      ${text}

      Respond ONLY with a valid JSON object in this format (no markdown, no explanation, no extra text):
      {"skills": ["skill1", "skill2"], "score": 85, "suggestions": "Improvement suggestions..."}
    `;
    try {
      const content = await this.callCohereLLM(prompt);
      console.log('Ollama LLM raw response:', content);
      if (!content) throw new Error('No content to parse');
      let result;
      try {
        // Try direct JSON parse first
        result = JSON.parse(content);
      } catch (jsonErr) {
        // Try to extract the first JSON object from the response
        const jsonMatch = content.match(/\{[\s\S]*?\}/);
        if (!jsonMatch) {
          console.error('Ollama LLM error: No valid JSON found in response:', content);
          throw new Error('Resume analysis failed: The AI did not return valid JSON. Raw output: ' + content);
        }
        try {
          result = JSON.parse(jsonMatch[0]);
        } catch (parseErr) {
          console.error('Ollama LLM error: Failed to parse extracted JSON:', jsonMatch[0]);
          throw new Error('Resume analysis failed: The AI returned invalid JSON. Raw output: ' + content);
        }
      }
      // Clamp and validate score
      let score = Number(result.score);
      if (isNaN(score) || score < 0) score = 0;
      if (score > 100) score = 100;
      return {
        skills: result.skills,
        score,
        suggestions: result.suggestions,
      };
    } catch (e: any) {
      console.error('Ollama LLM error:', e.response?.data || e.message);
      // User-friendly error for frontend
      throw new Error(
        'Resume analysis failed. The AI could not process your resume. Please try again, and ensure your resume is clear and well-formatted. If the problem persists, contact support.'
      );
    }
  }

  async generateResponse(context: string, question: string): Promise<string> {
    const prompt = `Context: ${context}\nQuestion: ${question}\nAnswer:`;
    try {
      const content = await this.callCohereLLM(prompt);
      console.log('Ollama LLM raw response:', content);
      if (!content) throw new Error('No content to parse');
      return content;
    } catch (e: any) {
      console.error('Ollama LLM error:', e.response?.data || e.message);
      throw new Error('Chat failed: LLM API error');
    }
  }
}
