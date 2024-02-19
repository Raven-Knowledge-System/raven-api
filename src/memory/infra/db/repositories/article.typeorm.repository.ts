import { Injectable } from '@nestjs/common';
import { ArticleRepositoryPort } from '../../../domain/ports/article.repository.port';
import { InjectRepository } from '@nestjs/typeorm';
import { MemoryRecord } from '../tables/memory.table-definition';
import { Repository } from 'typeorm';
import { Article } from 'memory/domain/entities/article';
import { toDomain, toPersistence } from '../mappers/article.mapper';
import { Nullable } from 'lib/nullable';

@Injectable()
export class ArticleTypeormRepository implements ArticleRepositoryPort {
  constructor(
    @InjectRepository(MemoryRecord)
    private readonly memoryDb: Repository<MemoryRecord>,
  ) {}

  async create(article: Article): Promise<Article> {
    const saved = await this.memoryDb.save(toPersistence(article));
    return toDomain(saved);
  }

  async findByUrl(userUuid: string, url: string): Promise<Nullable<Article>> {
    const memory = await this.memoryDb.findOne({
      where: { user: { uuid: userUuid }, content: { url } },
      relations: ['content', 'user'],
    });

    return memory ? toDomain(memory) : null;
  }

  async findByUuid(uuid: string): Promise<Nullable<Article>> {
    const memory = await this.memoryDb.findOne({
      where: { uuid },
      relations: ['content', 'user'],
    });

    return memory ? toDomain(memory) : null;
  }

  async findAllForUser(userUuid: string): Promise<Article[]> {
    const memories = await this.memoryDb.find({
      where: { user: { uuid: userUuid } },
      relations: ['content', 'user'],
    });

    return memories.map(toDomain);
  }
}
