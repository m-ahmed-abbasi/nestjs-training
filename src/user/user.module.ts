import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { Task } from 'src/task/task.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Task])],
  providers: [UserService],
  controllers: [UserController]
})
export class UserModule { }
