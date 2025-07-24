import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { AdminModule } from './modules/admin/admin.module';
import { ResumeModule } from './modules/resume/resume.module';
import { RagController } from './modules/rag/rag.controller';
import { RagService } from './modules/rag/rag.service';
import { VectorDbService } from './modules/rag/vector-db.service';
import { JobModule } from './modules/job/job.module';

@Module({
  imports: [AuthModule, UserModule, AdminModule, ResumeModule, JobModule],
  controllers: [AppController, RagController],
  providers: [AppService, RagService, VectorDbService],
})
export class AppModule {}
