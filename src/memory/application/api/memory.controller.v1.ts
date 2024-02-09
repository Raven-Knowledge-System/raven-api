import {
  Body,
  ConflictException,
  Controller,
  Injectable,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { MemoryPostDto } from './dto/memory.post.dto';
import { MemoryResponseDto } from './dto/memory.response.dto';
import { CreateUsingAiService } from 'memory/domain/services/create-using-ai.service';
import { ApiKeyGuard } from 'auth/api-key.guard';
import { AuthenticatedUser } from 'auth/authenticated-user.decorator';
import { ExistsChecker } from 'memory/domain/services/exists-checker.service';

@ApiTags('Memory')
@Injectable()
@Controller({
  version: '1',
  path: 'memory',
})
@UseGuards(ApiKeyGuard)
export class MemoryV1Controller {
  constructor(
    private readonly createUsingAiService: CreateUsingAiService,
    private readonly existsChecker: ExistsChecker,
  ) {}

  @Post('/auto')
  @ApiOperation({
    summary: 'Create Memory',
    description: 'Uses AI to generate a memory from a url.',
  })
  @ApiCreatedResponse({
    type: MemoryResponseDto,
    description: 'The memory was created successfully.',
  })
  async postMemory(
    @AuthenticatedUser() userUuid: string,
    @Body() dto: MemoryPostDto,
  ): Promise<MemoryResponseDto> {
    if (await this.existsChecker.checkExists(userUuid, dto.url)) {
      throw new ConflictException('Memory already exists for user');
    }

    return new MemoryResponseDto(
      await this.createUsingAiService.createUsingAi(userUuid, dto.url),
    );
  }
}
