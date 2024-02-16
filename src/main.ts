import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import yaml from 'yaml';
import path from 'path';
import * as fs from 'fs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });

  const config = new DocumentBuilder().setTitle('Raven').build();

  app.enableVersioning({
    type: VersioningType.URI,
  });

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const yamlString = yaml.stringify(document);
  const filePath = path.resolve(process.cwd(), 'swagger.yaml');
  fs.writeFileSync(filePath, yamlString, 'utf8');

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      enableDebugMessages: true,
      forbidUnknownValues: true,
    }),
  );
  await app.listen(3000, '0.0.0.0');
}
bootstrap();
