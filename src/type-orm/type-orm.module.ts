import { Module } from '@nestjs/common';
import { TypeOrmModule as TypeOrm } from '@nestjs/typeorm';
import { SqlServerConnectionOptions } from 'typeorm/driver/sqlserver/SqlServerConnectionOptions';

const options: SqlServerConnectionOptions = {
  type: 'mssql',
  host: '127.0.0.1',
  port: 1433,
  username: 'dev',
  password: 'interiordesign',
  database: 'interiordesign',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: true,
  cache: true,
  migrationsTableName: '__MigrationHistory',
  migrations: ['src/server/common/data/migrations/**{.js,.ts}'],
  options: {
    encrypt: true,
  },
};

@Module({
  imports: [TypeOrm.forRoot(options)],
})
export class TypeOrmModule {}
