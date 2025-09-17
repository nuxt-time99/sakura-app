import { HttpErrorCode } from "@constant/http-error-code.constant";
import { BaseException } from "./base.exception";
import { HttpStatusCode } from "@constant/http-status-code.constant";

export class NotFoundException extends BaseException {
    constructor(details?: string) {
        super(
            "Not Found: Could not be found the resource.",
            HttpErrorCode.NOT_FOUND,
            HttpStatusCode.NOT_FOUND,
            details
        );
    }
}
