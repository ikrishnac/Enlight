import * as fromReducer from './books.reducer';

describe('Books Reducer', () => {

  const books = require('./../../testData.json');

  it('should return the previous state', () => {
    const action = {} as any;
    const result = fromReducer.booksReducer(fromReducer.initialState, action);
    expect(result).toBe(fromReducer.initialState);
  });

  it('should action load books', () => {
    const action = { type: "[Books] Load Books", payload: "java" } as any;
    const expected = { ...fromReducer.initialState, searchString: 'java', loading: true } as any;
    const result = fromReducer.booksReducer(fromReducer.initialState, action);
    expect(result).toEqual(expected);
  });

  it('should action load book details', () => {
    const action = { type: "[Books] Load Book Details", payload: "BREwDwAAQBAJ" } as any;
    const expected = { ...fromReducer.initialState, loadBookDetails: 'BREwDwAAQBAJ', loading: true } as any;
    const result = fromReducer.booksReducer(fromReducer.initialState, action);
    expect(result).toEqual(expected);
  });

  it('should add to cart if not already exists', () => {
    const action = { type: "[Books] Add books to cart", payload: "tsjZDwAAQBAJ" } as any;
    const state = JSON.parse(JSON.stringify(fromReducer.initialState));
    const booksObj = { books: { ...state.books, ...books.books.books } };
    const stateobj = JSON.parse(JSON.stringify({ ...state, ...booksObj }));
    const expected = { ...state, ...booksObj, loading: true } as any;
    expected.cart.push(books.books.books.items[0]);
    const result = fromReducer.booksReducer(stateobj, action);
    expect(result).toEqual(expected);
  });

  it('should not add to cart if already exists', () => {
    const action = { type: "[Books] Add books to cart", payload: "tsjZDwAAQBAJ" } as any;
    const state = JSON.parse(JSON.stringify(fromReducer.initialState));
    const booksObj = { books: { ...state.books, ...books.books.books } };
    const stateobj = JSON.parse(JSON.stringify({ ...state, ...booksObj }));
    stateobj.cart.push(books.books.books.items[0]);
    const result = fromReducer.booksReducer(stateobj, action);
    const expected = { ...stateobj, loading: true }
    expect(result).toEqual(expected);
  });

  it('should action buy now and add to collections', () => {
    const action = { type: "[Books] Buy now book", payload: "tsjZDwAAQBAJ", billingDetails: { name: "test", email: "test@gmail.com"}} as any;
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
    const action = { type: "[Books] Buy now book", payload: "tsjZDwAAQBAJ", billingDetails: { name: "test", email: "test@gmail.com"}} as any;
    const state = JSON.parse(JSON.stringify(fromReducer.initialState));
    const booksObj = { books: { ...state.books, ...books.books.books } };
    const stateobj = JSON.parse(JSON.stringify({ ...state, ...booksObj }));
    const purchasedBook = stateobj.books.items.filter(element => element.id === action.payload);
    const appendBillingInfo = purchasedBook.map(obj => ({ ...obj, billingDetails: action.billingDetails }));
    const expected = { ...state, ...booksObj, loading: true } as any;
    expected.collections.push(appendBillingInfo[0]);
    const result = fromReducer.booksReducer(stateobj, action);
    expect(result).toEqual(expected);
  });

  it('should action checkout cart and add to collections', () => {
    const action = { type: "[Books] Check out cart", payload: "tsjZDwAAQBAJ", billingDetails: { name: "test", email: "test@gmail.com"}} as any;
    const state = JSON.parse(JSON.stringify(fromReducer.initialState));
    const booksObj = { books: { ...state.books, ...books.books.books } };
    const stateobj = JSON.parse(JSON.stringify({ ...state, ...booksObj }));
    const expected = { ...state, ...booksObj, loading: true } as any;
    stateobj.cart.push(books.books.books.items[0]);
    const result = fromReducer.booksReducer(stateobj, action);
    const purchasedBook = stateobj.cart.filter(element => element.id === action.payload);
    const appendBillingInfo = purchasedBook.map(obj => ({ ...obj, billingDetails: action.billingDetails }));
    expected.collections.push(appendBillingInfo[0]);
    expect(result).toEqual(expected);
  });

  it('should action remove from cart', () => {
    const action = { type: "[Books] Remove book to cart", payload: "tsjZDwAAQBAJ" } as any;
    const stateObj = JSON.parse(JSON.stringify(fromReducer.initialState));
    stateObj.cart.push(books.books.books.items[0]);
    const expected = { ...fromReducer.initialState, loading: true } as any;
    const result = fromReducer.booksReducer(stateObj, action);
    expect(result).toEqual(expected);
  });

  it('should action load books success', () => {
    const action = { type: "[Books] Load Books Success", payload: books.books.books.items } as any;
    const expected = { ...fromReducer.initialState, books: books.books.books.items, loaded: true, loading: false } as any;
    const result = fromReducer.booksReducer(fromReducer.initialState, action);
    expect(result).toEqual(expected);
  });

  it('should action load books success', () => {
    const error = {
      error: "server error"
    }
    const action = { type: "[Books] Load Books Fail", payload: error.error } as any;
    const expected = { ...fromReducer.initialState, books: [], error: error.error, loaded: false, loading: false } as any;
    const result = fromReducer.booksReducer(fromReducer.initialState, action);
    expect(result).toEqual(expected);
  });
});
