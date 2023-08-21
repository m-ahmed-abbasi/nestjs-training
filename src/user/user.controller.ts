import { Controller, Get, Post, Param, Body, UseFilters } from '@nestjs/common';
import { User } from './user.entity';
import { UserService } from './user.service';
import { ExceptionsFilter } from 'src/filters/ExceptionsFilter';

@Controller('user')
@UseFilters(ExceptionsFilter)
export class UserController {
    
    constructor(readonly userService: UserService) { }
    
    @Get(':userId')
    details(@Param('userId') userId: string) {
        return this.userService.find(userId);
    }

    @Post('create')
    async create(@Body() user: Partial<User>) {
        return await this.userService.create(user);
    }

    @Post('update')
    update(@Body() user: Partial<User>) {
        return this.userService.update(user);
    }
}
