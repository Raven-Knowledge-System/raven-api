import { Body, Controller, Injectable, Post, UseGuards } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { MemoryPostDto } from './dto/memory.post.dto';
import { MemoryResponseDto } from './dto/memory.response.dto';
import { CreateUsingAiService } from 'memory/domain/services/create-using-ai.service';
import { ApiKeyGuard } from 'auth/api-key.guard';
import { AuthenticatedUser } from 'auth/authenticated-user.decorator';
import { User } from 'user/domain/user';

@ApiTags('Memory')
@Injectable()
@Controller({
  version: '1',
  path: 'memory',
})
@UseGuards(ApiKeyGuard)
export class MemoryV1Controller {
  constructor(private readonly createUsingAiService: CreateUsingAiService) {}

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
    @AuthenticatedUser() user: User,
    @Body() dto: MemoryPostDto,
  ): Promise<MemoryResponseDto> {
    return new MemoryResponseDto(
      await this.createUsingAiService.createUsingAi(user.uuid, dto.url),
    );
  }
}
