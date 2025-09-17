import { HttpErrorCode } from "@constant/http-error-code.constant";
import { BaseException } from "./base.exception";
import { HttpStatusCode } from "@constant/http-status-code.constant";

export class UnauthorizedException extends BaseException {
    constructor(details?: string) {
        super(
            "Unauthorized: Authentication required, please login.",
            HttpErrorCode.UNAUTHORIZED,
            HttpStatusCode.UNAUTHORIZED,
            details
        );
    }
}
