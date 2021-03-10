import * as booksActions from './books.actions';
import * as fromRoot from './store';
import { BooksState } from './../shared/books.model';


export interface AppState extends fromRoot.State {
  books: BooksState;
}

export const initialState: BooksState = {
  books : { items: []},
  searchString: '',
  loadBookDetails: '',
  cart: [],
  collections: [],
  loading: false,
  loaded: false,
  error: ''
};

export function booksReducer(
  state = initialState,
  action: booksActions.action
): BooksState {
  switch (action.type) {
    case booksActions.BooksActionTypes.LOAD_BOOKS: {
      return {
        ...state,
        searchString: action.payload,
        loading: true
      };
    }
    case booksActions.BooksActionTypes.LOAD_BOOK_DETAILS: {
      return {
        ...state,
        loadBookDetails: action.payload,
        loading: true
      };
    }
    case booksActions.BooksActionTypes.Add_TO_CART: {
      const cartIndex = state.cart.findIndex(x => x.id === action.payload);
      if (cartIndex === -1) {
        return {
          ...state,
          cart: [...state.cart, ...state.books.items.filter(element => element.id === action.payload)],
          loading: true
        }
      } else {
        return {
          ...state,
          loading: true
        };
      }
    }
    case booksActions.BooksActionTypes.REMOVE_FROM_CART: {
      return {
        ...state,
        cart: [...state.cart.filter(element => element.id !== action.payload)],
        loading: true
      }
    }
    case booksActions.BooksActionTypes.BUY_NOW_BOOK: {
      const cartIndex = state.collections.findIndex(x => x.id === action.payload);
      const purchasedBook = state.books.items.filter(element => element.id === action.payload);
      const appendBillingInfo = purchasedBook.map(obj => ({ ...obj, billingDetails: action.billingDetails }));
      if (cartIndex === -1) {
        return {
          ...state,
          collections: [...state.collections, ...appendBillingInfo],
          loading: true
        }
      } else {
        return {
          ...state,
          loading: true
        };
      }
    }
    case booksActions.BooksActionTypes.CHECK_OUT_CART: {
      const appendBillingInfo = state.cart.map(obj => ({ ...obj, billingDetails: action.billingDetails }));
      return {
        ...state,
        collections: [...state.collections, ...appendBillingInfo],
        cart: [],
        loading: true
      }
    }
    case booksActions.BooksActionTypes.LOAD_BOOKS_SUCCESS: {
      return {
        ...state,
        loading: false,
        loaded: true,
        books: action.payload
      };
    }
    case booksActions.BooksActionTypes.LOAD_BOOKS_FAIL: {
      return {
        ...state,
        books: { items: []},
        loading: false,
        loaded: false,
        error: action.payload
      };
    }

    default: {
      return state;
    }
  }
}