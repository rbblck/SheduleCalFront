import { HttpErrorResponse } from "@angular/common/http";

export abstract class ApplicationError {

    private errorType: string;
    private status: number;
    private statusText: string;

    constructor(public httpError?: HttpErrorResponse) {
        this.errorType = httpError?.error ? 'HttpErrorResponse' : 'Error Type Not KNown';
        this.status = httpError?.status ? httpError.status : -1;
        this.statusText = httpError?.statusText ? httpError.statusText : 'Not OK';
    }
    
    public get getErrorType() : string {
        return this.errorType;
    }
    
    public get getStatus() : number {
        return this.status;
    }

    public get getStatusText() : string {
        return this.statusText;
    }

    get message() : string {
        return 'Unknown Error';
    };
}