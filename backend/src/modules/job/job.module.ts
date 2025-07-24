import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JobService } from './job.service';
import { JobController } from './job.controller';
import { PrismaService } from '../../prisma/prisma.service';
import { RagService } from '../rag/rag.service';
import { ChromaService } from '../resume/chroma.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [ConfigModule, AuthModule],
  controllers: [JobController],
  providers: [JobService, PrismaService, RagService, ChromaService],
})
export class JobModule {} 