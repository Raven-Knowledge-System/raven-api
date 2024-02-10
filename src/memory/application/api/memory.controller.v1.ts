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
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { MemoryResponseDto } from './dto/memory.response.dto';
import { MemoryCreateUsingAiService } from 'memory/domain/services/memory-create-using-ai.service';
import { ApiKeyGuard } from 'auth/api-key.guard';
import { AuthenticatedUser } from 'auth/authenticated-user.decorator';
import { MemoryExistsChecker as MemoryExistsChecker } from 'memory/domain/services/memory-exists-checker.service';
import { MemoryDeleteService as DeleteMemoryService } from 'memory/domain/services/memory-delete.service';
import { CreateMemoryService } from 'memory/domain/services/memory-create.service';
import { MemoryPostDto } from './dto/memory.post.dto';
import { AutoMemoryPostDto } from './dto/auto-memory.post.dto';
import { StatusCodes } from 'http-status-codes';
import { MemoryGetAllService } from 'memory/domain/services/memory-get-all-service';

@ApiTags('Memory')
@Injectable()
@Controller({
  version: '1',
  path: 'memory',
})
@UseGuards(ApiKeyGuard)
export class MemoryV1Controller {
  constructor(
    private readonly createUsingAiService: MemoryCreateUsingAiService,
    private readonly existsChecker: MemoryExistsChecker,
    private readonly deleteService: DeleteMemoryService,
    private readonly createService: CreateMemoryService,
    private readonly getAllService: MemoryGetAllService,
  ) {}

  @Get('/')
  @ApiOperation({
    summary: 'Get All Memories',
  })
  async getAllMemories(
    @AuthenticatedUser() userUuid: string,
  ): Promise<MemoryResponseDto[]> {
    return (await this.getAllService.getAll(userUuid)).map(
      (memory) => new MemoryResponseDto(memory),
    );
  }

  @Post('/auto')
  @ApiOperation({
    summary: 'Auto Create Memory',
    description: 'Uses AI to generate a memory from a url.',
  })
  @ApiCreatedResponse({
    type: MemoryResponseDto,
    description: 'The memory was created successfully.',
  })
  async postMemoryAuto(
    @AuthenticatedUser() userUuid: string,
    @Body() dto: AutoMemoryPostDto,
  ): Promise<MemoryResponseDto> {
    await this.throwIfExists(userUuid, dto.url);
    return new MemoryResponseDto(
      await this.createUsingAiService.createUsingAi(userUuid, dto.url),
    );
  }

  @Post('/')
  @ApiOperation({
    summary: 'Create Memory',
    description: 'Create a memory manually.',
  })
  @ApiCreatedResponse({
    type: MemoryResponseDto,
    description: 'The memory was created successfully.',
  })
  async postMemory(
    @AuthenticatedUser() userUuid: string,
    @Body() dto: MemoryPostDto,
  ): Promise<MemoryResponseDto> {
    await this.throwIfExists(userUuid, dto.url);
    console.log('dto', dto);
    return new MemoryResponseDto(
      await this.createService.create({ userUuid, ...dto }),
    );
  }

  @Delete('/:uuid')
  @ApiOperation({
    summary: 'Delete Memory',
  })
  @HttpCode(StatusCodes.NO_CONTENT)
  async deleteMemory(
    @Param('uuid', new ParseUUIDPipe()) uuid: string,
  ): Promise<void> {
    console.log('uuid', uuid);
    await this.throw404IfNotFound(uuid);
    await this.deleteService.deleteByUuid(uuid);
  }

  private async throwIfExists(userUuid: string, url: string): Promise<void> {
    if (await this.existsChecker.existsForUser(userUuid, url)) {
      throw new ConflictException('Memory already exists for user');
    }
  }

  private async throw404IfNotFound(uuid: string): Promise<void> {
    if (!(await this.existsChecker.existsByUuid(uuid))) {
      throw new NotFoundException('Memory not found');
    }
  }
}
