import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/user.entity';

@Injectable()
export class TaskService {

    constructor(
        @InjectRepository(Task)
        readonly taskRepository: Repository<Task>,
        @InjectRepository(User)
        readonly userRepository: Repository<User>
    ) { }

    async findAll(userId: string) {
        return await this.taskRepository.find({ where: { user: { id: userId } } });
    }

    async findOne(taskId: string, userId: string) {
        return await this.taskRepository.find({ where: { id: taskId, user: { id: userId } } });
    }

    async create(task: Partial<Task>, userId: string) {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (user) {
            const created = this.taskRepository.create(task);
            user.tasks.push(created);
            created.user = user;
            this.userRepository.save(user);
            return this.taskRepository.save(task);
        }
    }

    async update(task: Partial<Task>, userId: string) {
        const original = await this.taskRepository.findOne({ where: { id: task.id, user: { id: userId } } });
        if (original) {
            original.title = task.title;
            original.status = task.status;
            original.dueDate = task.dueDate;
            original.description = task.description;

            this.taskRepository.save(original);
        }
    }

    async delete(taskId: string, userId: string) {
        const task = await this.taskRepository.findOne({ where: { id: taskId, user: { id: userId } } });
        this.taskRepository.delete(task);
    }
}
