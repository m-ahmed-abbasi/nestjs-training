import { Injectable, } from '@nestjs/common';
import { InjectRepository, } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) { }

    find(id: string): Promise<User | null> {
        return this.usersRepository.findOneBy({ id });
    }

    async create(user: Partial<User>): Promise<User> {
        const saved = await this.usersRepository.create(user);
        return this.usersRepository.save(saved);
    }

    async update(user: Partial<User>): Promise<User> {
        const original = await this.usersRepository.findOneBy({ id: user.id });
        if (original) {
            original.firstName = user.firstName;
            original.lastName = user.lastName;
            original.email = user.email;
            original.username = user.username;
            return this.usersRepository.save(original);
        }
        return null;
    }

    async remove(id: string) {
        return await this.usersRepository.delete(id);
    }
}
