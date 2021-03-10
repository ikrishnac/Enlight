import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpInterceptor } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NGXLogger } from 'ngx-logger';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(private logger: NGXLogger) {}

    intercept(request: HttpRequest<{q: string}>, next: HttpHandler) {
        return next.handle(request).pipe(catchError(err => {
            const error = (err && err.error && err.error.error.message) || err.message;
            this.logger.error('Log from interceptor', error); 
            return throwError(error);
        }));
    }
}