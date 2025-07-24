import { Controller, Get, Post, UseGuards, UploadedFile, UseInterceptors, Req, Param, Body, Delete } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { ResumeService } from './resume.service';
import { Request } from 'express';

@Controller('resumes')
export class ResumeController {
  constructor(private readonly resumeService: ResumeService) {}

  /**
   * Get all resumes for the logged-in user
   * GET /resumes
   * Requires: Bearer JWT token
   * Returns: Array of resumes with analysis
   */
  @Get()
  @UseGuards(JwtAuthGuard)
  async getUserResumes(@Req() req: Request) {
    const user = req.user as any;
    return this.resumeService.getUserResumes(user);
  }

  /**
   * Upload a resume file (PDF/DOCX)
   * POST /resumes/upload
   * Requires: Bearer JWT token
   * Returns: Resume with analysis
   */
  @Post('upload')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  async uploadResume(@UploadedFile() file: Express.Multer.File, @Req() req: Request) {
    // req.user is set by JwtStrategy
    const user = req.user as any;
    return this.resumeService.uploadResume(user, file);
  }

  /**
   * TEMP: Re-embed all resumes for all users (admin/migration utility)
   * POST /resumes/reembed-all
   */
  @Post('reembed-all')
  @UseGuards(JwtAuthGuard)
  async reembedAll(@Req() req: Request) {
    // Optionally, check for admin role here
    // if ((req.user as any).role !== 'ADMIN') throw new ForbiddenException('Admins only');
    return this.resumeService.reembedAllResumes();
  }

  /**
   * TEMP: Seed and embed 100 fake resumes (POST /resumes/seed-and-embed)
   */
  @Post('seed-and-embed')
  @UseGuards(JwtAuthGuard)
  async seedAndEmbedResumes(@Req() req: Request) {
    // Optionally, check for admin role here
    // if ((req.user as any).role !== 'ADMIN') throw new ForbiddenException('Admins only');
    return this.resumeService.seedAndEmbedResumes(100);
  }

  /**
   * TEMP: Seed and embed N fake jobs (POST /jobs/seed-and-embed)
   */
  @Post('/jobs/seed-and-embed')
  @UseGuards(JwtAuthGuard)
  async seedAndEmbedJobs(@Body('count') count: number = 100) {
    // Optionally, check for admin role here
    // if ((req.user as any).role !== 'ADMIN') throw new ForbiddenException('Admins only');
    return this.resumeService.seedAndEmbedJobs(count);
  }

  @Post('reembed/:id')
  @UseGuards(JwtAuthGuard)
  async reembedSingle(@Param('id') id: string) {
    return this.resumeService.reembedResumeById(Number(id));
  }

  @Post('reembed-missing')
  @UseGuards(JwtAuthGuard)
  async reembedMissing() {
    return this.resumeService.reembedMissingResumes();
  }

  @Post('seed-job-matching-resume/:id')
  @UseGuards(JwtAuthGuard)
  async seedJobMatchingResume(@Param('id') id: string) {
    return this.resumeService.seedJobMatchingResume(Number(id));
  }

  @Post('seed-jobs-matching-all-resumes')
  @UseGuards(JwtAuthGuard)
  async seedJobsMatchingAllResumes() {
    return this.resumeService.seedJobsMatchingAllResumes();
  }

  @Get(':id/matches')
  @UseGuards(JwtAuthGuard)
  async getResumeMatches(@Param('id') id: string, @Req() req: Request) {
    const user = req.user as any;
    return this.resumeService.getResumeMatches(Number(id), user.id);
  }

  @Get(':id/chunk-ids')
  @UseGuards(JwtAuthGuard)
  async getResumeChunkIds(@Param('id') id: string) {
    return this.resumeService.printResumeChunkIds(Number(id));
  }

  @Get('verify-embeddings')
  @UseGuards(JwtAuthGuard)
  async verifyEmbeddings() {
    return this.resumeService.verifyAllEmbeddings();
  }

  @Post('force-reembed-all-with-logs')
  @UseGuards(JwtAuthGuard)
  async forceReembedAllWithLogs() {
    return this.resumeService.forceReembedAllResumesWithLogs();
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteResume(@Param('id') id: string, @Req() req: Request) {
    const user = req.user as any;
    return this.resumeService.deleteResumeById(Number(id), user.id);
  }

  @Get(':id/skill-matches')
  @UseGuards(JwtAuthGuard)
  async getSkillMatchedJobs(@Param('id') id: string, @Req() req: Request) {
    const user = req.user as any;
    return this.resumeService.getSkillMatchedJobs(Number(id), user.id);
  }
} 