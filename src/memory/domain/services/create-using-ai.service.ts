import { Injectable } from '@nestjs/common';
import { MemoryRepositoryPort } from 'memory/infra/db/ports/memory.repository.port';
import { SummaryRepositoryPort } from 'memory/infra/db/ports/summary.repository.port';
import { Memory } from '../memory';

@Injectable()
export class CreateUsingAiService {
  constructor(
    private readonly summarizer: SummaryRepositoryPort,
    private readonly repo: MemoryRepositoryPort,
  ) {}

  async createUsingAi(userUuid: string, url: string): Promise<Memory> {
    const { summary, title } = await this.summarizer.summarize(url);
    return this.repo.create(new Memory({ url, summary, title, userUuid }));
  }
}
