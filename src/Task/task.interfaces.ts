export interface Task {
    id: number;
    title: string;
    description: string;
    status: TaskStatus;
    dueDate: Date;
    createdAt: Date;
    updatedAt: Date;
}

export enum TaskStatus {
    ACTIVE = 'ACTIVE',
    COMPLETED = 'COMPLETED',
    CANCELLED = 'CANCELLED'
}