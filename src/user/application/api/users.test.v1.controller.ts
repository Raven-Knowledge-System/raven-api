import {
  Controller,
  Delete,
  HttpCode,
  Injectable,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { RegisterTestUserService } from '../services/register-test-user.service';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { TestUserDto } from '../dto/test-user.dto';
import { StatusCodes } from 'http-status-codes';
import { DeleteTestUserService } from '../services/delete-test-user.service';

// TODO: only import in development
@ApiTags('Test')
@Injectable()
@Controller({
  version: '1',
  path: '/test/users',
})
export class UsersTestV1Controller {
  constructor(
    private readonly registerTestUserService: RegisterTestUserService,
    private readonly deleteTestUserService: DeleteTestUserService,
  ) {}

  @Post()
  @ApiOperation({
    description: 'Register a test user',
  })
  @ApiCreatedResponse({
    description: 'The test user has been registered',
    type: TestUserDto,
  })
  async registerTestUser(): Promise<TestUserDto> {
    return new TestUserDto(
      await this.registerTestUserService.registerTestUser(),
    );
  }

  @Delete('/:uuid')
  @ApiOperation({
    description: 'Delete a test user',
  })
  @HttpCode(StatusCodes.NO_CONTENT)
  async deleteTestUser(
    @Param('uuid', new ParseUUIDPipe()) uuid: string,
  ): Promise<void> {
    await this.deleteTestUserService.deleteUser(uuid);
  }
}
