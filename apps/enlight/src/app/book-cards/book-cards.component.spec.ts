import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import * as BooksActions from './../store/books.actions';
import { of } from 'rxjs';
import { BookCardsComponent } from './book-cards.component';
import { BooksFacade } from '../store/books.facade';

describe('BookCardsComponent', () => {
  let component: BookCardsComponent;
  let fixture: ComponentFixture<BookCardsComponent>;

  const storeMock = {
    dispatch() {
      return of(new BooksActions.RemoveBookFromCart('23jkjkjhh23'));
    }
  };

  const facadeMock = {
    loadBookDetails: () => { return; },
    removeBookFromCart: () => { return; }
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookCardsComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [FlexLayoutModule, RouterTestingModule],
      providers: [{
        provide: Store,
        useValue: storeMock
      },
      {
        provide: BooksFacade,
        useValue: facadeMock
      }],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set fxFlexValue value to 30% if displayType is searchComponent', () => {
    component.displayType = 'searchComponent'
    component.ngOnInit();
    expect(component.fxFlexValue).toBe('30%');
  });

  it('should handle more info books', inject([Router], (mockRouter: Router) => {
    const spy = spyOn(mockRouter, 'navigate').and.stub();
    component.handleClick('23jkjkjhh23', 'searchComponent');
    expect(spy.calls.first().args[0]).toContain('search/book-info/23jkjkjhh23');
  }));

  it('should handle remove books', inject([Router, BooksFacade], (mockRouter: Router, booksFacade: BooksFacade) => {
    const facadeSpy = spyOn(booksFacade, 'removeBookFromCart').and.stub();
    component.handleClick('23jkjkjhh23', 'cartComponent');
    expect(facadeSpy).toHaveBeenCalled();
  }));
});
