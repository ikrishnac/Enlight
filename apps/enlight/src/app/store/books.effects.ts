import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { Ibooks } from '../shared/books.model';
import { BooksService } from './../shared/books.service';
import * as BooksActions from './books.actions';

@Injectable()
export class BooksEffect {
  constructor(
    private actions$: Actions,
    private booksService: BooksService
  ) { }

  @Effect()
  loadBookss$: Observable<Action> = this.actions$.pipe(
    ofType<BooksActions.LoadBooks>(
      BooksActions.BooksActionTypes.LOAD_BOOKS
    ),
    mergeMap((actions: BooksActions.LoadBooks) =>
      this.booksService.getBooks(actions.payload).pipe(
        map(
          (books: Ibooks) =>
            new BooksActions.LoadBooksSuccess(books)
        ),
        catchError(err => of(new BooksActions.LoadBooksFail(err)))
      )
    )
  );
}