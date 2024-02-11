import {
  Controller,
  Delete,
  Get,
  HttpCode,
  Injectable,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { MemoryResponseDto } from './dto/memory.response.dto';
import { ApiKeyGuard } from 'auth/api-key.guard';
import { AuthenticatedUser } from 'auth/authenticated-user.decorator';
import { MemoryExistsChecker as MemoryExistsChecker } from 'memory/application/services/memory-exists-checker.service';
import { MemoryDeleteService as DeleteMemoryService } from 'memory/application/services/memory-delete.service';
import { StatusCodes } from 'http-status-codes';
import { MemoryGetAllService } from 'memory/application/services/memory-get-all-service';

@ApiTags('Memory')
@Injectable()
@Controller({
  version: '1',
  path: 'memories',
})
@UseGuards(ApiKeyGuard)
export class MemoryV1Controller {
  constructor(
    private readonly existsChecker: MemoryExistsChecker,
    private readonly deleteService: DeleteMemoryService,
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

  @Delete('/:uuid')
  @ApiOperation({
    summary: 'Delete Memory',
  })
  @HttpCode(StatusCodes.NO_CONTENT)
  async deleteMemory(
    @Param('uuid', new ParseUUIDPipe()) uuid: string,
  ): Promise<void> {
    await this.throw404IfNotFound(uuid);
    await this.deleteService.deleteByUuid(uuid);
  }

  private async throw404IfNotFound(uuid: string): Promise<void> {
    if (!(await this.existsChecker.existsByUuid(uuid))) {
      throw new NotFoundException('Memory not found');
    }
  }
}
