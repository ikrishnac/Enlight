import { TestBed, inject } from '@angular/core/testing';
import { of } from 'rxjs';
import { BooksFacade } from './books.facade';
import { Store } from '@ngrx/store';
const books = require('./../../testData.json');


let facade: BooksFacade;
const storeMock = {
    select: () => {
        return of(books.books);
    },
    dispatch: () => {
        return;
    }
};

describe('Search Facade Service', () => {
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [],
            providers: [BooksFacade, { provide: Store, useValue: storeMock }],
        });
        facade = TestBed.inject(BooksFacade);
    });

    it('should  call getBooks', inject([Store], (store: Store) => {
        const spy = spyOn(store, 'dispatch').and.stub();
        facade.loadBooks('java');
        expect(spy).toHaveBeenCalled();
    }));

    it('should  call loadBookDetails', inject([Store], (store: Store) => {
        const spy = spyOn(store, 'dispatch').and.stub();
        facade.loadBookDetails('sdfkjlsdf');
        expect(spy).toHaveBeenCalled();
    }));

    it('should  call getBooksInfo$', inject([Store], (store: Store) => {
        const spy = spyOn(store, 'select').and.stub();
        facade.getBooksInfo$('sdfkjlsdf');
        expect(spy).toHaveBeenCalled();
    }));

    it('should  call buyBookNow', inject([Store], (store: Store) => {
        const spy = spyOn(store, 'dispatch').and.stub();
        facade.buyBookNow('checkout', '{name:"first"}');
        expect(spy).toHaveBeenCalled();
    }));

    it('should  call checkoutCart', inject([Store], (store: Store) => {
        const spy = spyOn(store, 'dispatch').and.stub();
        facade.checkoutCart('checkoutCart', '{name:"first"}');
        expect(spy).toHaveBeenCalled();
    }));

    it('should  call addBooksToCart', inject([Store], (store: Store) => {
        const spy = spyOn(store, 'dispatch').and.stub();
        facade.addBooksToCart('addBooksToCart');
        expect(spy).toHaveBeenCalled();
    }));

    it('should  call removeBookFromCart', inject([Store], (store: Store) => {
        const spy = spyOn(store, 'dispatch').and.stub();
        facade.removeBookFromCart('addBooksToCart');
        expect(spy).toHaveBeenCalled();
    }));
});