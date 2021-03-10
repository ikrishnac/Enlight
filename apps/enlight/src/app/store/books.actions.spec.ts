import { billingDetails } from '../shared/books.model';
import * as fromBooks from './books.actions';


const books = require('./../../testData.json');
describe('loadBookss', () => {
  const billingDetails: billingDetails = {
    name: 'test name',
    email: 'testemail@gmail.com',
    phone: 9973788729,
    address: 'test address' 
  }

  const booksArray = books.books.books.items
  it('should return an LoadBooks action', () => {
    expect(new fromBooks.LoadBooks('').type).toBe('[Books] Load Books');
  });
  it('should return an LoadBooks action', () => {
    expect(new fromBooks.LoadBookDetails('').type).toBe('[Books] Load Book Details');
  });

  it('should return an AddBooksToCart action', () => {
    expect(new fromBooks.AddBooksToCart('').type).toBe('[Books] Add books to cart');
  });
  it('should return an RemoveBookFromCart action', () => {
    expect(new fromBooks.RemoveBookFromCart('').type).toBe('[Books] Remove book to cart');
  });
  it('should return an BuyBookNow action', () => {
    expect(new fromBooks.BuyBookNow('', billingDetails).type).toBe('[Books] Buy now book');
  });

  it('should return an CheckoutCart action', () => {
    expect(new fromBooks.CheckoutCart('',billingDetails).type).toBe('[Books] Check out cart');
  });

  it('should return an LoadBooksSuccess action', () => {
    expect(new fromBooks.LoadBooksSuccess(booksArray).type).toBe('[Books] Load Books Success');
  });
  it('should return an LoadBooksFail action', () => {
    expect(new fromBooks.LoadBooksFail('').type).toBe('[Books] Load Books Fail');
  });
});
