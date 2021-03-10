import * as fromReducer from './books.reducer';
import * as booksActions from './books.actions';
import { BooksActionTypes } from './books.actions';

describe('Books Reducer', () => {

  const books = require('./../../testData.json');

  it('should return the previous state', () => {
    const action = {} as booksActions.action;
    const result = fromReducer.booksReducer(fromReducer.initialState, action);
    expect(result).toBe(fromReducer.initialState);
  });

  it('should action load books', () => {
    const action = { type: BooksActionTypes.LOAD_BOOKS, payload: 'java' } as booksActions.LoadBooks;
    const expected = { ...fromReducer.initialState, searchString: 'java', loading: true };
    const result = fromReducer.booksReducer(fromReducer.initialState, action);
    expect(result).toEqual(expected);
  });

  it('should action load book details', () => {
    const action = { type: BooksActionTypes.LOAD_BOOK_DETAILS, payload: 'BREwDwAAQBAJ' } as booksActions.LoadBookDetails;
    const expected = { ...fromReducer.initialState, loadBookDetails: 'BREwDwAAQBAJ', loading: true };
    const result = fromReducer.booksReducer(fromReducer.initialState, action);
    expect(result).toEqual(expected);
  });

  it('should add to cart if not already exists', () => {
    const action = { type: BooksActionTypes.Add_TO_CART, payload: 'tsjZDwAAQBAJ' } as booksActions.AddBooksToCart;
    const state = JSON.parse(JSON.stringify(fromReducer.initialState));
    const booksObj = { books: { ...state.books, ...books.books.books } };
    const stateobj = JSON.parse(JSON.stringify({ ...state, ...booksObj }));
    const expected = { ...state, ...booksObj, loading: true };
    expected.cart.push(books.books.books.items[0]);
    const result = fromReducer.booksReducer(stateobj, action);
    expect(result).toEqual(expected);
  });

  it('should not add to cart if already exists', () => {
    const action = { type: BooksActionTypes.Add_TO_CART, payload: 'tsjZDwAAQBAJ' } as booksActions.AddBooksToCart;
    const state = JSON.parse(JSON.stringify(fromReducer.initialState));
    const booksObj = { books: { ...state.books, ...books.books.books } };
    const stateobj = JSON.parse(JSON.stringify({ ...state, ...booksObj }));
    stateobj.cart.push(books.books.books.items[0]);
    const result = fromReducer.booksReducer(stateobj, action);
    const expected = { ...stateobj, loading: true }
    expect(result).toEqual(expected);
  });

  it('should action buy now and add to collections', () => {
    const action = {
      type: BooksActionTypes.BUY_NOW_BOOK, payload: 'tsjZDwAAQBAJ',
      billingDetails: { name: 'test', email: 'test@gmail.com' }
    } as booksActions.BuyBookNow;
    const state = JSON.parse(JSON.stringify(fromReducer.initialState));
    const booksObj = { books: { ...state.books, ...books.books.books } };
    const stateobj = JSON.parse(JSON.stringify({ ...state, ...booksObj }));
    const purchasedBook = stateobj.books.items.filter(element => element.id === action.payload);
    const appendBillingInfo = purchasedBook.map(obj => ({ ...obj, billingDetails: action.billingDetails }));
    stateobj.collections.push(appendBillingInfo[0]);
    const result = fromReducer.booksReducer(stateobj, action);
    const expected = { ...stateobj, loading: true }
    expect(result).toEqual(expected);
  });

  it('should action buy now and not add to collections if already exists', () => {
    const action = {
      type: BooksActionTypes.BUY_NOW_BOOK, payload: 'tsjZDwAAQBAJ',
      billingDetails: { name: 'test', email: 'test@gmail.com' }
    } as booksActions.BuyBookNow;
    const state = JSON.parse(JSON.stringify(fromReducer.initialState));
    const booksObj = { books: { ...state.books, ...books.books.books } };
    const stateobj = JSON.parse(JSON.stringify({ ...state, ...booksObj }));
    const purchasedBook = stateobj.books.items.filter(element => element.id === action.payload);
    const appendBillingInfo = purchasedBook.map(obj => ({ ...obj, billingDetails: action.billingDetails }));
    const expected = { ...state, ...booksObj, loading: true };
    expected.collections.push(appendBillingInfo[0]);
    const result = fromReducer.booksReducer(stateobj, action);
    expect(result).toEqual(expected);
  });

  it('should action checkout cart and add to collections', () => {
    const action = {
      type: BooksActionTypes.CHECK_OUT_CART,
      payload: 'tsjZDwAAQBAJ',
      billingDetails: { name: 'tsjZDwAAQBAJ', email: 'test@gmail.com' }
    } as booksActions.CheckoutCart;
    const state = JSON.parse(JSON.stringify(fromReducer.initialState));
    const booksObj = { books: { ...state.books, ...books.books.books } };
    const stateobj = JSON.parse(JSON.stringify({ ...state, ...booksObj }));
    const expected = { ...state, ...booksObj, loading: true };
    stateobj.cart.push(books.books.books.items[0]);
    const result = fromReducer.booksReducer(stateobj, action);
    const purchasedBook = stateobj.cart.filter(element => element.id === action.payload);
    const appendBillingInfo = purchasedBook.map(obj => ({ ...obj, billingDetails: action.billingDetails }));
    expected.collections.push(appendBillingInfo[0]);
    expect(result).toEqual(expected);
  });

  it('should action remove from cart', () => {
    const action = { type: BooksActionTypes.REMOVE_FROM_CART, payload: 'tsjZDwAAQBAJ' } as booksActions.action;
    const stateObj = JSON.parse(JSON.stringify(fromReducer.initialState));
    stateObj.cart.push(books.books.books.items[0]);
    const expected = { ...fromReducer.initialState, loading: true };
    const result = fromReducer.booksReducer(stateObj, action);
    expect(result).toEqual(expected);
  });

  it('should action load books success', () => {
    const action = { type: BooksActionTypes.LOAD_BOOKS_SUCCESS, payload: books.books.books.items } as booksActions.LoadBooksSuccess;
    const expected = { ...fromReducer.initialState, books: books.books.books.items, loaded: true, loading: false };
    const result = fromReducer.booksReducer(fromReducer.initialState, action);
    expect(result).toEqual(expected);
  });

  it('should action load books failure', () => {
    const error = {
      error: 'server error'
    }
    const action = { type: BooksActionTypes.LOAD_BOOKS_FAIL, payload: error.error } as booksActions.LoadBooksFail;
    const expected = { ...fromReducer.initialState, books: { items: [] }, error: error.error, loaded: false, loading: false };
    const result = fromReducer.booksReducer(fromReducer.initialState, action);
    expect(result).toEqual(expected);
  });
});
