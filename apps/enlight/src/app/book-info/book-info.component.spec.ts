import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { BooksFacade } from '../store/books.facade';
import { BookInfoComponent } from './book-info.component';

describe('BookInfoComponent', () => {
  let component: BookInfoComponent;
  let fixture: ComponentFixture<BookInfoComponent>;
  const books = require('./../../testData.json');

  const storeMock = {
  };

  const facadeMock = {
    getSelectedBook$: of(books.books.books.items[0].id),
    getBooksInfo$: () => {
      return of(books.books.books.items[0]);
    },
    addBooksToCart: () => { return; }
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookInfoComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [{
        provide: Store,
        useValue: storeMock
      },
      {
        provide: BooksFacade,
        useValue: facadeMock
      }],
      imports: [RouterTestingModule],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch addToCard action and route to search ', inject([Router], (mockRouter: Router) => {
    const spy = spyOn(mockRouter, 'navigate').and.stub();
    component.addToCard('sdfsdf23');
    expect(spy.calls.first().args[0]).toContain('search');
  }));

  it('should route to billing-info ', inject([Router], (mockRouter: Router) => {
    const spy = spyOn(mockRouter, 'navigate').and.stub();
    component.buyNow('sdfsdf23');
    expect(spy.calls.first().args[0]).toContain('billing-info/sdfsdf23');
  }));
});
