import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { Task } from 'src/task/task.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Task]),
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
