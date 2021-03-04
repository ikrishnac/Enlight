import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { BooksEffect } from './books.effects';

describe('BooksEffects', () => {
  let actions$: Observable<any>;
  let effects: BooksEffect;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
      ],
      providers: [
        BooksEffect,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(BooksEffect);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
