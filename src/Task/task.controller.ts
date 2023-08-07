import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { TaskService } from "./task.service";
import { Task } from "./task.interfaces";

@Controller('tasks')
export class TaskController {

    constructor(private taskService: TaskService) { }

    @Get()
    getTasks() {
        return this.taskService.getTasks();
    }

    @Get(':taskId')
    getTask(@Param('taskId') taskId: number) {
        return this.taskService.getTask(taskId);
    }

    @Post()
    updateTask(@Body() task: Task) {
        this.taskService.updateTask(task);
    }

    @Put()
    createTask(@Body() task: Task) {
        this.taskService.createTask(task);
    }

    @Delete(':taskId')
    deleteTask(@Param('taskId') taskId: number) {
        this.taskService.deleteTask(taskId);
    }
}