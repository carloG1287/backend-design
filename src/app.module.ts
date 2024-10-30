import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from './type-orm/type-orm.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UsersModule, AuthModule, TypeOrmModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
