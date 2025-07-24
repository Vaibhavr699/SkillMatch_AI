import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';

interface ResumeAnalysis {
  skills: string[];
  score: number;
  suggestions: string;
}

@Injectable()
export class OpenAIService {
  private openai: OpenAI;

  constructor(private configService: ConfigService) {
    this.openai = new OpenAI({
      apiKey: this.configService.get<string>('OPENAI_API_KEY'),
    });
  }

  async analyzeResume(text: string): Promise<ResumeAnalysis> {
    const prompt = `
      Analyze the following resume and provide:
      1. A list of technical skills (as a JSON array)
      2. A score from 0-100 based on completeness, clarity, and professionalism
      3. Suggestions for improvement

      Resume:
      ${text}

      Respond with JSON in this format:
      {
        "skills": ["skill1", "skill2"],
        "score": 85,
        "suggestions": "Improvement suggestions..."
      }
    `;

    const response = await this.openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      response_format: { type: 'json_object' },
    });

    const content = response.choices[0].message.content;
    if (!content) throw new Error("No content to parse");
    return JSON.parse(content);
  }

  async createEmbedding(text: string): Promise<number[]> {
    const response = await this.openai.embeddings.create({
      model: 'text-embedding-3-small',
      input: text,
    });

    return response.data[0].embedding;
  }
}