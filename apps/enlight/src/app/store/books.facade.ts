import { Injectable } from '@angular/core';
import { Store } from "@ngrx/store";
import { Observable } from 'rxjs';
import * as BooksActions from "./books.actions";
import * as fromCustomer from "./books.selectors";

@Injectable({
    providedIn: 'root'
})
export class BooksFacade {
    getBooks$: Observable<any> = this.store.select(fromCustomer.getBooks);
    getSelectedBook$: Observable<any> = this.store.select(fromCustomer.getSelectedBook);
    getCartBooks$: Observable<any> = this.store.select(fromCustomer.getCartBooks);
    getCollectionBooks$: Observable<any> = this.store.select(fromCustomer.getCollectionBooks);

    constructor(private store: Store) { }

    getBooksInfo$(bookId) {
        return this.store.select(fromCustomer.getBookInfo, bookId);
    }

    loadBooks(searchValue) {
      this.store.dispatch(new BooksActions.LoadBooks(searchValue));
    }

    loadBookDetails(bookId) {
        this.store.dispatch(new BooksActions.LoadBookDetails(bookId));
      }

    buyBookNow(params, billingInfoForm) {
        this.store.dispatch(new BooksActions.BuyBookNow(params, billingInfoForm));
    }

    checkoutCart(params, billingInfoForm) {
        this.store.dispatch(new BooksActions.CheckoutCart(params, billingInfoForm));
    }

    addBooksToCart(bookId) {
        this.store.dispatch(new BooksActions.AddBooksToCart(bookId));
    }

    removeBookFromCart(bookId) {
      this.store.dispatch(new BooksActions.RemoveBookFromCart(bookId));
    }
}