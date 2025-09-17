import { HttpErrorCode } from "@constant/http-error-code.constant";
import { BaseException } from "./base.exception";
import { HttpStatusCode } from "@constant/http-status-code.constant";

export class ForbiddenException extends BaseException {
    constructor(details?: string) {
        super(
            "Forbidden: You do not have access to this resource.",
            HttpErrorCode.FORBIDDEN,
            HttpStatusCode.FORBIDDEN,
            details
        );
    }
}
