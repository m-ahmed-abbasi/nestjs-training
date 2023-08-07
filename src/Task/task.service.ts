import { Injectable } from "@nestjs/common";
import { Task } from "./task.interfaces";

@Injectable()
export class TaskService {

    tasks: Task[] = [];

    getTasks() {
        return this.tasks;
    }

    getTask(taskId: number) {
        return this.tasks.find((item) => item.id.toString() === taskId.toString());
    }

    updateTask(task: Task) {
        task.updatedAt = new Date();
        const taskIndex = this.tasks.findIndex((item) => item.id === task.id);
        const firstHalf = this.tasks.slice(0, taskIndex);
        const secondHalf = this.tasks.slice(taskIndex + 1);
        this.tasks = [...firstHalf, task, ...secondHalf];
    }

    createTask(task: Task) {
        task.id = this.createUniqueId();
        task.createdAt = new Date();
        task.updatedAt = new Date();
        this.tasks.push(task);
    }

    deleteTask(taskId: number) {
        this.tasks = this.tasks.filter((item) => item.id.toString() !== taskId.toString());
    }

    createUniqueId() {
        let newId = 0;
        const currentIds = this.tasks.map(item => item.id);
        while (currentIds.includes(newId)) {
            newId++
        }

        return newId;
    }
}