import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor( readonly authService: AuthService ) {}

    @Post('login')
    login(@Body() creds: { email: string; password: string }) {
        return this.authService.authenticate(creds.email, creds.password);
    }
}
