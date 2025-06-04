import { ApplicationError } from "./application-error";

export class BadUrlError extends ApplicationError {

    override get message() {
        return 'Bad Url Error!';
    }
    
}