import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRecord } from 'user/infra/db/user.table-definition';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(
    @InjectRepository(UserRecord)
    private readonly userRepo: Repository<UserRecord>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const apiKey = request.headers['corvidae-api-key'];

    if (!apiKey) {
      throw new UnauthorizedException('API key is missing');
    }

    const user = await this.userRepo.findOne({ where: { apiKey } });

    if (!user) {
      throw new UnauthorizedException('Invalid API key');
    }

    request.user = user;
    return true;
  }
}
