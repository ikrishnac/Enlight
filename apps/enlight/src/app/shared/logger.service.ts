import { Injectable } from '@angular/core';
import { NGXLogger } from 'ngx-logger';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  constructor(private logger: NGXLogger) { }

  logError(error: Error): void {
    this.logger.error('Log error', error); 
  }
}
