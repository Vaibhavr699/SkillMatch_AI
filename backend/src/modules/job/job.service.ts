import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { RagService } from '../rag/rag.service';
import { ChromaService } from '../resume/chroma.service';

@Injectable()
export class JobService {
  constructor(
    private prisma: PrismaService,
    private ragService: RagService,
    private chromaService: ChromaService,
  ) {}

  async seedJobs() {
    const sampleJobs = [
      {
        title: 'Backend Developer',
        company: 'Tech Corp',
        description: 'Looking for a Node.js and MongoDB expert...',
        skills: ['Node.js', 'MongoDB', 'Express'],
      },
      {
        title: 'Frontend Developer',
        company: 'Webify',
        description: 'React and TypeScript developer for modern web apps.',
        skills: ['React', 'TypeScript', 'CSS'],
      },
      {
        title: 'Data Scientist',
        company: 'DataWiz',
        description: 'Analyze data and build ML models using Python.',
        skills: ['Python', 'Machine Learning', 'Pandas'],
      },
      {
        title: 'DevOps Engineer',
        company: 'CloudOps',
        description: 'Manage CI/CD pipelines and cloud infrastructure.',
        skills: ['AWS', 'Docker', 'CI/CD'],
      },
      {
        title: 'Full Stack Engineer',
        company: 'StackMagic',
        description: 'Work on both frontend and backend systems.',
        skills: ['JavaScript', 'Node.js', 'React'],
      },
      {
        title: 'Mobile App Developer',
        company: 'Appify',
        description: 'Build cross-platform mobile apps with Flutter.',
        skills: ['Flutter', 'Dart', 'Firebase'],
      },
      {
        title: 'QA Engineer',
        company: 'QualityFirst',
        description: 'Automate tests and ensure software quality.',
        skills: ['Selenium', 'Jest', 'Testing'],
      },
      {
        title: 'Product Manager',
        company: 'InnovateX',
        description: 'Lead product development and strategy.',
        skills: ['Product Management', 'Agile', 'Scrum'],
      },
      {
        title: 'UI/UX Designer',
        company: 'DesignHub',
        description: 'Design user interfaces and experiences.',
        skills: ['Figma', 'Sketch', 'User Research'],
      },
      {
        title: 'Security Analyst',
        company: 'SecureIT',
        description: 'Monitor and improve application security.',
        skills: ['Security', 'Penetration Testing', 'OWASP'],
      },
      {
        title: 'Database Administrator',
        company: 'DataKeepers',
        description: 'Manage and optimize SQL/NoSQL databases.',
        skills: ['SQL', 'PostgreSQL', 'MongoDB'],
      },
    ];

    for (const job of sampleJobs) {
      // 1. Save job to Prisma DB
      const createdJob = await this.prisma.job.create({
        data: {
          title: job.title,
          company: job.company,
          description: job.description,
          skills: job.skills,
        },
      });

      // 2. Generate embedding for job description
      const text = `${job.title} at ${job.company}. ${job.description}. Skills: ${job.skills.join(', ')}`;
      let embedding: number[] | undefined = undefined;
      try {
        embedding = await this.ragService.getEmbedding(text);
      } catch (e) {
        console.error('Error generating embedding for job', createdJob.id, e);
      }
      if (!embedding || !Array.isArray(embedding) || embedding.length === 0) {
        console.error('No embedding returned for job', createdJob.id, text);
      } else {
        // 3. Store embedding in ChromaDB
        try {
          await this.chromaService.addJobEmbedding(
            `job_${createdJob.id}`,
            embedding,
            text
          );
          console.log('Stored embedding for job', createdJob.id);
        } catch (e) {
          console.error('Error storing embedding for job', createdJob.id, e);
        }
      }
    }
    return { count: sampleJobs.length };
  }

  async searchJobs(query: string) {
    const embedding = await this.ragService.getEmbedding(query);
    return this.chromaService.findSimilarJobs(embedding);
  }

  async getMatchedJobs(user: { id: number } | { userId: number }) {
    // 1. Get all user resumes and their skills
    const userId = 'userId' in user ? user.userId : user.id;
    const resumes = await this.prisma.resume.findMany({
      where: { userId },
      include: { analysis: true },
    });
    // 2. Aggregate all unique skills from all resumes
    const userSkills = Array.from(new Set(
      resumes.flatMap(r => (r.analysis?.skills || []))
    ));
    if (userSkills.length === 0) {
      // If no skills, return no jobs
      return [];
    }
    // 3. Find jobs where at least one skill matches
    const jobs = await this.prisma.job.findMany();
    // 4. Score jobs by number of matching skills
    const scoredJobs = jobs.map(job => {
      const matchCount = (job.skills || []).filter(skill => userSkills.includes(skill)).length;
      return { ...job, matchCount };
    });
    // 5. Filter and sort jobs by matchCount
    return scoredJobs
      .filter(job => job.matchCount > 0)
      .sort((a, b) => b.matchCount - a.matchCount)
      .slice(0, 10);
  }

  async getJobEmbeddings(id: number) {
    const chunkId = `job_${id}`;
    const embedding = await this.chromaService.getJobEmbedding(chunkId);
    if (embedding) {
      return [{ chunkId, embedding }];
    }
    return [];
  }
}