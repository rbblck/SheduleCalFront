import { ApplicationError } from "./application-error";

export class GeneralApplicationError extends ApplicationError {

    override get message(): string {
        return 'General Application Error';
    }
    
}