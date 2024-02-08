import { Body, Controller, Injectable, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { MemoryPostDto } from './dto/memory.post.dto';
import { MemoryResponseDto } from './dto/memory.response.dto';
import { CreateUsingAiService } from 'memory/domain/services/create-using-ai.service';

@ApiTags('Memory')
@Injectable()
@Controller({
  version: '1',
  path: 'memory',
})
export class MemoryV1Controller {
  constructor(private readonly createUsingAiService: CreateUsingAiService) {}

  @Post('/auto')
  @ApiOperation({
    summary: 'Create Memory',
    description: 'Uses AI to generate a memory from a link.',
  })
  @ApiCreatedResponse({
    type: MemoryResponseDto,
    description: 'The memory was created successfully.',
  })
  async postMemory(@Body() dto: MemoryPostDto): Promise<MemoryResponseDto> {
    return new MemoryResponseDto(
      await this.createUsingAiService.createUsingAi(dto.link),
    );
  }
}
