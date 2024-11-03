import { Module } from '@nestjs/common';
import { TypeOrmModule as TypeOrm } from '@nestjs/typeorm';
import { SqlServerConnectionOptions } from 'typeorm/driver/sqlserver/SqlServerConnectionOptions';

const options: SqlServerConnectionOptions = {
  type: 'mssql',
  host: 'localhost',
  port: 1433,
  username: 'urbe',
  password: 'malditaurbe',
  database: 'interiordesign',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: true,
  cache: true,
  migrationsTableName: '__MigrationHistory',
  migrations: ['src/server/common/data/migrations/**{.js,.ts}'],
  options: {
    encrypt: false,
    trustServerCertificate: false,
  },
};

@Module({
  imports: [TypeOrm.forRoot(options)],
})
export class TypeOrmModule {}
