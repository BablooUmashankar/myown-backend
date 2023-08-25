import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {retry, catchError , map} from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {


    return next.handle(req).pipe(
      retry(3),
      map(res => {
        //debugger;
        if (res instanceof HttpResponse) {
          return res;
        }
        return null;
      }),
      catchError((err: HttpErrorResponse) => {
        let errMsg = "";
        if (err.error instanceof ErrorEvent) {
          errMsg = `Error : ${err.message}`;
        } else {
          errMsg = `Error Message : ${err.message}`;
        }
        return throwError(() => Error(errMsg))
      })


    )

  }
}
