import { Controller, Post, Get, Query, UseGuards, Req, Param } from '@nestjs/common';
import { JobService } from './job.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { Request } from 'express';

@Controller('jobs')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @Post('seed')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  async seedJobs() {
    return this.jobService.seedJobs();
  }

  @Get('search')
  async searchJobs(@Query('query') query: string) {
    return this.jobService.searchJobs(query);
  }

  @Get('matched')
  @UseGuards(JwtAuthGuard)
  async getMatchedJobs(@Req() req: Request) {
    const user = req.user as any;
    return this.jobService.getMatchedJobs(user);
  }

  @Get(':id/embeddings')
  @UseGuards(JwtAuthGuard)
  async getJobEmbeddings(@Param('id') id: string) {
    return this.jobService.getJobEmbeddings(Number(id));
  }
}