import { HttpException } from "@nestjs/common";
import { HttpErrorCode } from "@constant/http-error-code.constant";
import { HttpStatusCode } from "@constant/http-status-code.constant";

export class BaseException extends HttpException {
    public readonly details?: string;
    public readonly isOperational: boolean;

    public readonly errorCode: HttpErrorCode;
    public readonly statusCode: HttpStatusCode;
    constructor(
        message: string,
        errorCode: HttpErrorCode,
        statusCode: HttpStatusCode,
        details?: string,
        isOperational: boolean = true
    ) {
        super(message, statusCode, {
            cause: details,
        });

        this.name = new.target.name;
        this.details = details;
        this.errorCode = errorCode;
        this.statusCode = statusCode;
        this.isOperational = isOperational;

        if (this.name === "ServerException") {
            this.isOperational = false;
        }

        Error.captureStackTrace(this, this.constructor);
    }
}
