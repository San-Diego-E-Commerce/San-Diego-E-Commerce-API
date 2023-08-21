import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { UsersService } from './modules/users/users.service';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [UsersModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
