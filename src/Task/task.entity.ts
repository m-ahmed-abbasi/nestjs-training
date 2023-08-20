import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { TaskStatus } from './task.interface';
import { User } from 'src/user/user.entity';

@Entity()
export class Task {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column({
        type: 'enum',
        enum: TaskStatus,
        default: TaskStatus.ACTIVE
    })
    status: TaskStatus;

    @Column()
    dueDate: Date;

    @ManyToOne(type => User, user => user.tasks)
    user: User;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}