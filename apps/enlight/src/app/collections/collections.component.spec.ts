import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { BooksFacade } from '../store/books.facade';
import { CollectionsComponent } from './collections.component';

describe('CollectionsComponent', () => {
  let component: CollectionsComponent;
  let fixture: ComponentFixture<CollectionsComponent>;
  const books = require('./../../testData.json');
  const storeMock = {};
  const facadeMock = {
    getCollectionBooks$: of(books.books.collections)
  }


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CollectionsComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [{
        provide: Store,
        useValue: storeMock
      },
      {
        provide: BooksFacade,
        useValue: facadeMock
      }]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', async () => {
    expect(component).toBeTruthy();
  });

  it('should unsubscribes when destoryed', () => {
    spyOn(component['collectionSubscription'], 'unsubscribe').and.callThrough();
    component.ngOnDestroy();
    expect(component['collectionSubscription'].unsubscribe).toHaveBeenCalled();
  });
});
