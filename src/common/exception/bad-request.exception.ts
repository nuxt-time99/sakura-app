import { HttpErrorCode } from "@constant/http-error-code.constant";
import { BaseException } from "./base.exception";
import { HttpStatusCode } from "@constant/http-status-code.constant";

export class BadRequestException extends BaseException {
    constructor(details?: string) {
        super(
            "Bad Request: Invalid or missing parameters.",
            HttpErrorCode.BAD_REQUEST,
            HttpStatusCode.BAD_REQUEST,
            details
        );
    }
}
