import { Body, Controller, Delete, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { TaskService } from './task.service';
import { Task } from './task.entity';

@Controller('task')
@UseGuards(AuthGuard)
export class TaskController {

    constructor(
        readonly taskService: TaskService
    ) { }

    @Get()
    all(@Req() request: Request) {
        const userId = request['user'].sub;
        return this.taskService.findAll(userId);
    }

    @Get('find/:taskId')
    find(@Param() taskId: string, @Req() request: Request) {
        const userId = request['user'].sub;
        return this.taskService.findOne(taskId, userId);
    }

    @Post('create')
    create(@Body() task: Partial<Task>, @Req() request: Request) {
        const userId = request['user'].sub;
        return this.taskService.create(task, userId);
    }

    @Post('update')
    update(@Body() task: Partial<Task>, @Req() request: Request) {
        const userId = request['user'].sub;
        return this.taskService.update(task, userId);
    }

    @Delete(':taskId')
    delete(@Param('taskId') taskId: string, @Req() request: Request) {
        const userId = request['user'].sub;
        return this.taskService.delete(taskId, userId);
    }

}
