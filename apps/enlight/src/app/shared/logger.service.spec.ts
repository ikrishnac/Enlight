import { DatePipe } from '@angular/common';
import { HttpBackend } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import {
  LoggerConfig,
  NGXLogger,
  NGXLoggerHttpService,
  NGXMapperService,
} from 'ngx-logger';

import { LoggerService } from './logger.service';

describe('LoggerService', () => {
  let service: LoggerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        NGXLogger,
        NGXMapperService,
        HttpBackend,
        NGXLoggerHttpService,
        LoggerConfig,
        DatePipe,
      ],
    });
    service = TestBed.inject(LoggerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be call logError', () => {
    const error: Error = Error('error occured');
    service.logError(error);
    expect(service['logger'].error).toBeDefined();
  });
});
