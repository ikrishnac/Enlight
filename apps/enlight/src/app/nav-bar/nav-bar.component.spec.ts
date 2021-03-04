import { LayoutModule } from '@angular/cdk/layout';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavBarComponent } from './nav-bar.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { BooksFacade } from '../store/books.facade';

describe('NavBarComponent', () => {
  let component: NavBarComponent;
  let fixture: ComponentFixture<NavBarComponent>;
  const books = require('./../../testData.json');

  const storeMock = {};

  const facadeMock = {
    getCartBooks$: of(books.books.cart),
    getCollectionBooks$: of(books.books.collections)
  }

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [NavBarComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        {
          provide: Store,
          useValue: storeMock
        },
        {
          provide: BooksFacade,
          useValue: facadeMock
        }],
      imports: [
        NoopAnimationsModule,
        LayoutModule,
        MatButtonModule,
        MatIconModule,
        MatListModule,
        MatSidenavModule,
        MatToolbarModule,
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });

  it('should unsubscribes when destoryed', () => {
    spyOn(component['cartSubscription'], 'unsubscribe').and.callThrough();
    spyOn(component['collectionSubscription'], 'unsubscribe').and.callThrough();
    component.ngOnDestroy();
    expect(component['cartSubscription'].unsubscribe).toHaveBeenCalled();
    expect(component['collectionSubscription'].unsubscribe).toHaveBeenCalled();
  });
});
