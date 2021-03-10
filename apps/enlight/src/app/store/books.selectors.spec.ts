import { Ibooks, Iitems } from '../shared/books.model';
import * as fromCustomer from './books.selectors';

describe('Selectors', () => {
    const books = require('./../../testData.json');

    it('should return Books', () => {
        const expected: Ibooks = books.books.books;
        expect(fromCustomer.getBooks(books)).toEqual(expected);
    });

    it('should return selected getBookInfo ', () => {
        const expected: Iitems = books.books.books.items[0];
        expect(fromCustomer.getBookInfo(books, 'tsjZDwAAQBAJ')).toEqual(expected);
    });

    it('should return getCartBooks ', () => {
        const expected: Iitems[] = books.books.cart;
        expect(fromCustomer.getCartBooks(books)).toEqual(expected);
    });

    it('should return getCollectionBooks ', () => {
        const expected: Iitems[] = books.books.collections;
        expect(fromCustomer.getCollectionBooks(books)).toEqual(expected);
    });

    it('should return SelectedBook ', () => {
        const expected: string = books.books.loadBookDetails;
        expect(fromCustomer.getSelectedBook(books)).toEqual(expected);
    });

    it('should return getBooksLoading ', () => {
        const expected: boolean = books.books.loading;
        expect(fromCustomer.getBooksLoading(books)).toEqual(expected);
    });

    it('should return getBooksLoaded ', () => {
        const expected: boolean = books.books.loaded;
        expect(fromCustomer.getBooksLoaded(books)).toEqual(expected);
    });

    it('should return getError ', () => {
        const expected: string = books.books.error;
        expect(fromCustomer.getError(books)).toEqual(expected);
    });
})