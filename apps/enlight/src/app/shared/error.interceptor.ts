import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpInterceptor } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LoggerService } from './logger.service';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(private loggerService: LoggerService) {}

    intercept(request: HttpRequest<{q: string}>, next: HttpHandler) {
        return next.handle(request).pipe(catchError(err => {
            const error = (err && err.error && err.error.error.message) || err.message;
            this.loggerService.logError(error);
            return throwError(error);
        }));
    }
}