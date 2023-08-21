import { Body, Controller, Delete, Get, Param, Post, Req, UseGuards, UseFilters, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { TaskService } from './task.service';
import { Task } from './task.entity';
import { ExceptionsFilter } from 'src/filters/ExceptionsFilter';

@Controller('task')
@UseGuards(AuthGuard)
@UseFilters(ExceptionsFilter)
export class TaskController {

    constructor(
        readonly taskService: TaskService
    ) { }

    @Get()
    all(@Req() request: Request) {
        const userId = request['user'].sub;
        if(!userId) throw new UnauthorizedException();
        return this.taskService.findAll(userId);
    }

    @Get('find/:taskId')
    find(@Param() taskId: string, @Req() request: Request) {
        const userId = request['user'].sub;
        if(!userId) throw new UnauthorizedException();
        if(!taskId) throw new BadRequestException();
        return this.taskService.findOne(taskId, userId);
    }

    @Post('create')
    create(@Body() task: Partial<Task>, @Req() request: Request) {
        const userId = request['user'].sub;
        if(!userId) throw new UnauthorizedException();
        if(!task) throw new BadRequestException();
        return this.taskService.create(task, userId);
    }

    @Post('update')
    update(@Body() task: Partial<Task>, @Req() request: Request) {
        const userId = request['user'].sub;
        if(!userId) throw new UnauthorizedException();
        if(!task || !task.id) throw new BadRequestException();
        return this.taskService.update(task, userId);
    }

    @Delete(':taskId')
    delete(@Param('taskId') taskId: string, @Req() request: Request) {
        const userId = request['user'].sub;
        if(!userId) throw new UnauthorizedException();
        if(!taskId) throw new BadRequestException(); 
        return this.taskService.delete(taskId, userId);
    }

}
