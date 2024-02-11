import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { Test } from '@nestjs/testing';
import { AppModule } from 'app.module';

let memoized: NestFastifyApplication;

export async function getTestApplication(): Promise<NestFastifyApplication> {
  if (memoized) {
    return memoized;
  }

  const testModule = Test.createTestingModule({
    imports: [AppModule],
  });

  const t = await testModule.compile();

  memoized = t.createNestApplication<NestFastifyApplication>(
    new FastifyAdapter(),
  );

  await memoized.init();
  await memoized.getHttpAdapter().getInstance().ready();
  return memoized;
}
