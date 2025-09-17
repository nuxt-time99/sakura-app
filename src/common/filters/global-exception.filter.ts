import { BaseException } from "@exception/base.exception";
import { env } from "@helpers/validation";
import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import { Request, Response } from "express";

@Catch(BaseException, HttpException)
export class GlobalExceptionFilters implements ExceptionFilter {
    catch(exception: BaseException | HttpException, host: ArgumentsHost) {
        const context = host.switchToHttp();
        const request = context.getRequest<Request>();
        const response = context.getResponse<Response>();

        if (exception instanceof BaseException) {
            response.status(exception.statusCode).json({
                success: false,
                name: exception.name,
                errorCode: exception.errorCode,
                statusCode: exception.statusCode,
                message: exception.message,
                path: request.path,
                method: request.method,
                ...(env.app.nodeEnv === "development" && { stack: exception.stack }),
            });
        } else {
            response.status(exception.getStatus()).json({
                success: false,
                name: exception.name,
                errorCode: "Error",
                statusCode: exception.getStatus(),
                message: exception.message,
                path: request.path,
                method: request.method,
                ...(env.app.nodeEnv === "development" && { stack: exception.stack }),
            });
        }
    }
}
