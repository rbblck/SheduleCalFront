import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { BadUrlError } from '../error/bad-url-error';
import { GeneralApplicationError } from '../error/general-application-error';
import { OffDates } from '../interface/offDates';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(@Inject(String) private url: string, private http: HttpClient) { }

  create(resource: any): Observable<OffDates[]> {
    return this.http.post<OffDates[]>(`${this.url}`, resource)
        .pipe(
            catchError(this.handleError)
        );
  }

  private handleError(error: HttpErrorResponse) {
    console.log('error caught!', error.status);
    
      if (error.status === 404) {
          return throwError(() => new BadUrlError(error));
      } else {
          return throwError(() => new GeneralApplicationError(error));
      }
  }
}
