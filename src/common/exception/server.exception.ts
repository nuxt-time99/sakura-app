import { HttpErrorCode } from "@constant/http-error-code.constant";
import { BaseException } from "./base.exception";
import { HttpStatusCode } from "@constant/http-status-code.constant";

export class ServerException extends BaseException {
    constructor(details?: string) {
        super(
            "Server Exception: An unexpected error occured on the server.",
            HttpErrorCode.INTERNAL_SERVER_ERROR,
            HttpStatusCode.INTERNAL_SERVER_ERROR,
            details
        );
    }
}
