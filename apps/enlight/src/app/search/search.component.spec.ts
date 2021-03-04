import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { BooksFacade } from '../store/books.facade';
import { SearchComponent } from './search.component';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  const books = require('./../../testData.json');

  const storeMock = {};

  const facadeMock = {
    getBooks$: of(books.books.books.items),
    loadBooks: () => { return; }

  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [ReactiveFormsModule],
      providers: [{
        provide: Store,
        useValue: storeMock
      },
      {
        provide: BooksFacade,
        useValue: facadeMock
      }]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getBooks on form submit', inject([BooksFacade], (booksFacade: BooksFacade) => {
    component.searchForm.patchValue({ search: 'java' });
    const facadeSpy = spyOn(booksFacade, 'loadBooks').and.stub();
    component.getBooks();
    expect(facadeSpy).toHaveBeenCalled();
  }));

  it('should not call getBooks on form submit', inject([BooksFacade], (booksFacade: BooksFacade) => {
    component.searchForm.patchValue({ search: '' });
    const facadeSpy = spyOn(booksFacade, 'loadBooks').and.stub();
    component.getBooks();
    expect(facadeSpy).not.toHaveBeenCalled();
  }));
});
