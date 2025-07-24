import { Controller, Post, UploadedFile, UseInterceptors, Body } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import * as pdf from 'pdf-parse';
import { RagService } from './rag.service';
import { VectorDbService } from './vector-db.service';

@Controller('rag')
export class RagController {
  constructor(
    private readonly ragService: RagService,
    private readonly vectorDb: VectorDbService
  ) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadResume(@UploadedFile() file: Express.Multer.File) {
    const text = (await pdf(file.buffer)).text;
    const embedding = await this.ragService.getEmbedding(text);
    await this.vectorDb.addDocument(file.originalname, text, embedding, 'resume');
    return { message: 'Resume processed', embedding };
  }

  @Post('match')
  async matchJobs(@Body() body: { resumeId: string }) {
    // For demo, just use the resumeId as the document id
    const resumeResults = await this.vectorDb.query([], 'resume', 1); // get the embedding for resumeId
    const resumeEmbedding = resumeResults.embeddings[0];
    const jobResults = await this.vectorDb.query(resumeEmbedding, 'job', 5);
    return jobResults;
  }

  @Post('chat')
  async chat(@Body() body: { resumeId: string, question: string }) {
    // Retrieve resume text from Chroma
    const resumeResults = await this.vectorDb.query([], 'resume', 1); // get the document for resumeId
    const context = resumeResults.documents[0];
    const answer = await this.ragService.generateResponse(context, body.question);
    return { answer };
  }
} 