import { Module } from '@nestjs/common';
import { TypeOrmModule as TypeOrm } from '@nestjs/typeorm';
import { SqlServerConnectionOptions } from 'typeorm/driver/sqlserver/SqlServerConnectionOptions';

const options: SqlServerConnectionOptions = {
  type: 'mssql',
  host: 'localhost',
  port: 1433,
  username: 'krloz',
  password: 'krloz00*',
  database: 'interiordesign',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: true,
  cache: true,
  migrationsTableName: '__MigrationHistory',
  migrations: ['src/server/common/data/migrations/**{.js,.ts}'],
  logging: true,
  options: {
    encrypt: true,
    trustServerCertificate: true, // Permite certificados autofirmados
  },
};

@Module({
  imports: [TypeOrm.forRoot(options)],
})
export class TypeOrmModule {}
