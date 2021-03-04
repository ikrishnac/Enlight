import * as fromBooks from './books.actions';

describe('loadBookss', () => {
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
    expect(new fromBooks.BuyBookNow('', '').type).toBe('[Books] Buy now book');
  });

  it('should return an CheckoutCart action', () => {
    expect(new fromBooks.CheckoutCart('','').type).toBe('[Books] Check out cart');
  });

  it('should return an LoadBooksSuccess action', () => {
    expect(new fromBooks.LoadBooksSuccess('').type).toBe('[Books] Load Books Success');
  });
  it('should return an LoadBooksFail action', () => {
    expect(new fromBooks.LoadBooksFail('').type).toBe('[Books] Load Books Fail');
  });
});
