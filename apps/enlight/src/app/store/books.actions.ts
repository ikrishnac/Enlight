import { Action } from '@ngrx/store';
import { billingDetails, Ibooks } from '../shared/books.model';

export enum BooksActionTypes {
  LOAD_BOOKS = '[Books] Load Books',
  LOAD_BOOKS_SUCCESS = '[Books] Load Books Success',
  LOAD_BOOKS_FAIL = '[Books] Load Books Fail',
  LOAD_BOOK_DETAILS = '[Books] Load Book Details',
  Add_TO_CART = '[Books] Add books to cart',
  REMOVE_FROM_CART = '[Books] Remove book to cart',
  BUY_NOW_BOOK = '[Books] Buy now book',
  CHECK_OUT_CART = '[Books] Check out cart'
}

export class LoadBooks implements Action {
  readonly type = BooksActionTypes.LOAD_BOOKS;

  constructor(public payload: string) { }
}

export class LoadBookDetails implements Action {
  readonly type = BooksActionTypes.LOAD_BOOK_DETAILS;

  constructor(public payload: string) { }
}

export class AddBooksToCart implements Action {
  readonly type = BooksActionTypes.Add_TO_CART;

  constructor(public payload: string) { }
}

export class RemoveBookFromCart implements Action {
  readonly type = BooksActionTypes.REMOVE_FROM_CART;

  constructor(public payload: string) { }
}

export class BuyBookNow implements Action {
  readonly type = BooksActionTypes.BUY_NOW_BOOK;

  constructor(public payload: string, public billingDetails: billingDetails) { }
}

export class CheckoutCart implements Action {
  readonly type = BooksActionTypes.CHECK_OUT_CART;

  constructor(public payload: string, public billingDetails: billingDetails) { }

}

export class LoadBooksSuccess implements Action {
  readonly type = BooksActionTypes.LOAD_BOOKS_SUCCESS;

  constructor(public payload: Ibooks) { }
}

export class LoadBooksFail implements Action {
  readonly type = BooksActionTypes.LOAD_BOOKS_FAIL;

  constructor(public payload: string) { }
}

export type action = LoadBooks | LoadBookDetails | AddBooksToCart
  | RemoveBookFromCart | BuyBookNow | CheckoutCart | LoadBooksSuccess | LoadBooksFail;