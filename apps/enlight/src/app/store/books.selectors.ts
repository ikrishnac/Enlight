import { BooksState } from "./../shared/books.model";
import { createFeatureSelector, createSelector } from "@ngrx/store";


const getBooksFeatureState = createFeatureSelector<BooksState>(
  "books"
);

export const getBooks = createSelector(
  getBooksFeatureState,
  (state: BooksState) => state.books
);

export const getBookInfo = createSelector(
  getBooksFeatureState,
  (state: BooksState, id: any) => {
    // istanbul ignore else
    if (!!state.books && state.books.items) {
      return state.books.items.find(book => {
        // istanbul ignore else
        if (book.id === id) {
          return book;
        }
      });
    }
  }
);

export const getCartBooks = createSelector(
  getBooksFeatureState,
  (state: BooksState) => state.cart
);

export const getCollectionBooks = createSelector(
  getBooksFeatureState,
  (state: BooksState) => state.collections
);

export const getSelectedBook = createSelector(
  getBooksFeatureState,
  (state: BooksState) => state.loadBookDetails
);

export const getBooksLoading = createSelector(
  getBooksFeatureState,
  (state: BooksState) => state.loading
);

export const getBooksLoaded = createSelector(
  getBooksFeatureState,
  (state: BooksState) => state.loaded
);

export const getError = createSelector(
  getBooksFeatureState,
  (state: BooksState) => state.error
);