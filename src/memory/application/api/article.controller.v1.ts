import {
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  HttpCode,
  Injectable,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { ApiKeyGuard } from 'auth/api-key.guard';
import { AuthenticatedUser } from 'auth/authenticated-user.decorator';
import { MemoryDeleteService } from 'memory/application/services/memory-delete.service';
import { StatusCodes } from 'http-status-codes';
import { AutoMemoryPostDto } from './dto/auto-article.post.dto';
import { ArticleExistsChecker } from 'memory/application/services/article-exists-checker';
import { ArticleAiCreator } from 'memory/application/services/article-ai-creator';
import { ArticlePostDto } from './dto/article.post.dto';
import { ArticleDto } from './dto/article.dto';
import { ArticleCreateService } from 'memory/application/services/article-create.service';
import { ArticleGetAllService } from 'memory/application/services/article-get-all.service';

@ApiTags('Article')
@Injectable()
@Controller({
  version: '1',
  path: '/memories/articles',
})
@UseGuards(ApiKeyGuard)
export class ArticleV1Controller {
  constructor(
    private readonly existsChecker: ArticleExistsChecker,
    private readonly deleteService: MemoryDeleteService,
    private readonly getAllService: ArticleGetAllService,
    private readonly createUsingAiService: ArticleAiCreator,
    private readonly createService: ArticleCreateService,
  ) {}

  @Get('/')
  @ApiOperation({
    summary: 'Get All Articles',
  })
  @ApiOkResponse({
    type: ArticleDto,
    description: " A list of the user's memories.",
  })
  async getAllMemories(
    @AuthenticatedUser() userUuid: string,
  ): Promise<ArticleDto[]> {
    return (await this.getAllService.getAll(userUuid)).map(
      (article) => new ArticleDto(article),
    );
  }

  @Post('/auto')
  @ApiOperation({
    summary: 'Auto Create Memory',
    description: 'Uses AI to generate a memory from a url.',
  })
  @ApiCreatedResponse({
    type: ArticleDto,
    description: 'The memory was created successfully.',
  })
  async postMemoryAuto(
    @AuthenticatedUser() userUuid: string,
    @Body() dto: AutoMemoryPostDto,
  ): Promise<ArticleDto> {
    await this.throwIfExists(userUuid, dto.url);
    return new ArticleDto(
      await this.createUsingAiService.create(userUuid, dto.url),
    );
  }

  @Post('/')
  @ApiOperation({
    summary: 'Create Memory',
    description: 'Uses AI to generate a memory from a url.',
  })
  @ApiCreatedResponse({
    type: ArticleDto,
    description: 'The memory was created successfully.',
  })
  async postMemory(
    @AuthenticatedUser() userUuid: string,
    @Body() dto: ArticlePostDto,
  ): Promise<ArticleDto> {
    await this.throwIfExists(userUuid, dto.url);
    return new ArticleDto(await this.createService.create(userUuid, dto));
  }

  @Delete('/:uuid')
  @ApiOperation({
    summary: 'Delete article',
  })
  @HttpCode(StatusCodes.NO_CONTENT)
  async deleteMemory(
    @Param('uuid', new ParseUUIDPipe()) uuid: string,
  ): Promise<void> {
    await this.throw404IfNotFound(uuid);
    await this.deleteService.deleteByUuid(uuid);
  }

  private async throwIfExists(userUuid: string, url: string): Promise<void> {
    if (await this.existsChecker.existsByUrl(userUuid, url)) {
      throw new ConflictException('Article already exists for user');
    }
  }

  private async throw404IfNotFound(uuid: string): Promise<void> {
    if (!(await this.existsChecker.existsByUuid(uuid))) {
      throw new NotFoundException('Memory not found');
    }
  }
}
