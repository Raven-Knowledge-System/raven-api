import { Body, Controller, Injectable, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { MemoryPostDto } from './dto/memory.post.dto';
import { MemoryResponseDto } from './dto/memory.response.dto';

@ApiTags('Memory')
@Injectable()
@Controller({
  version: '1',
  path: 'memory',
})
export class MemoryV1Controller {
  @Post('/auto')
  @ApiOperation({
    summary: 'Create Memory',
    description: 'Uses AI to generate a memory from a link.',
  })
  @ApiCreatedResponse({
    type: MemoryResponseDto,
    description: 'The memory was created successfully.',
  })
  async postMemory(@Body() dto: MemoryPostDto): Promise<void> {
    console.log(dto);
  }
}
