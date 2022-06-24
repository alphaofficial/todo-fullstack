import { Logger } from '@nestjs/common';
import { Options } from '@mikro-orm/core';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';

const logger = new Logger('MikroORM');
const config = {
  entities: ['dist/entities/*.{ts,js}'],
  entitiesTs: ['src/entities/*.{ts,js}'],
  dbName: process.env.PG_DATABASE,
  type: 'postgresql',
  host: process.env.PG_HOST,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT || 5432,
  user: process.env.PG_USER,
  highlighter: new SqlHighlighter(),
  debug: true,
  logger: logger.log.bind(logger),
  autoLoadEntities: true,
  metadataProvider: TsMorphMetadataProvider,
  migrations: {
    tableName: 'migrations',
    path: 'dist/migrations',
    pathTs: 'src/migrations',
  },
} as Options;

export default config;
