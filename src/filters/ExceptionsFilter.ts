import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';

@Catch()
export class ExceptionsFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const request = host.switchToHttp().getRequest();
        const response = host.switchToHttp().getResponse();
        const status = exception.getStatus();
        // console.log(exception);

        response.status(status).json({
            statusCode: status,
            timestamp: new Date().toISOString(),
            path: request.url,
        });
    }
}