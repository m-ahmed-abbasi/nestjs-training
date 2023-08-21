import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        private jwtService: JwtService
    ) {}

    async authenticate(email: string, password: string) {
        const user = await this.usersRepository.findOne({ where: { email }});
        if(user && user.password === password) {
            return {
                token: await this.jwtService.signAsync({ sub: user.id, username: user.username })
            }
        }

        throw new UnauthorizedException();
    }
}
