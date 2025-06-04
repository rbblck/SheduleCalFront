import { ErrorHandler } from "@angular/core";
import { ApplicationError } from "./error/application-error";

export class AppErrorHandler implements ErrorHandler {

    handleError(error: ApplicationError): void {
        alert(`${error.message}, 'status:' ${error.getStatus}`);
    }
    
}