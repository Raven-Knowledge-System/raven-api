import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

const databaseUrl = process.env.DATABASE_URL;

export const baseConfigOptions: DataSourceOptions = {
  type: 'postgres',
  namingStrategy: new SnakeNamingStrategy(),
  url: databaseUrl,
  entities: [__dirname + '/**/infra/db/**/*table-definition{.js,.ts}'],
  extra: { max: 20 },
};

export const typeOrmOptions: TypeOrmModuleOptions = {
  ...baseConfigOptions,
  retryAttempts: 10,
  retryDelay: 3,
  namingStrategy: new SnakeNamingStrategy(),
  // TODO: only for quick dev
  synchronize: true,
  logging: true,
  entities: [__dirname + '/**/infra/db/**/*table-definition{.js,.ts}'],
  migrationsTableName: 'typeorm_migrations',
  migrationsTransactionMode: 'each',
};

export const dataSourceOptions: DataSourceOptions = {
  ...baseConfigOptions,
  namingStrategy: new SnakeNamingStrategy(),
  synchronize: false, // never do this
  entities: [__dirname + '/**/infra/db/**/*table-definition{.js,.ts}'],
  migrationsTableName: 'typeorm_migrations',
  migrationsTransactionMode: 'each',
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
