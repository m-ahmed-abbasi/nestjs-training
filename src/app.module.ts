import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskModule } from './task/task.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { Task } from './task/task.entity';
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports: [
    // Typeorm module
    TypeOrmModule.forRoot(
      {
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'Abbasi477',
        database: 'training',
        entities: [
          User,
          Task
        ],
        synchronize: true,
      }
    ),
    JwtModule.register({
      secret: 'MyJWTSecret',
      signOptions: {
        expiresIn: '1d',
      },
      global: true,
    }),
    TaskModule,
    UserModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
