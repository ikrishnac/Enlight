import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Actions } from '@ngrx/store-devtools/src/reducer';
import { Observable } from 'rxjs';

import { BooksEffect } from './books.effects';

describe('BooksEffects', () => {
  let actions$: Observable<Actions>;
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
