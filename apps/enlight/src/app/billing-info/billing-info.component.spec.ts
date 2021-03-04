import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from "@angular/router/testing";
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { BooksFacade } from '../store/books.facade';
import { BillingInfoComponent } from './billing-info.component';

describe('BillingInfoComponent', () => {
  let component: BillingInfoComponent;
  let fixture: ComponentFixture<BillingInfoComponent>;
  let router: Router;
  let books = require('./../../testData.json');
  let storeMock = {};
  let facadeMock;

  beforeEach(async () => {
    facadeMock = {
      getSelectedBook$: of(books.books.books.items[0].id),
      checkoutCart: () => {
        return;
      },
      buyBookNow: () => {
        return;
      }
    };
    await TestBed.configureTestingModule({
      declarations: [BillingInfoComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [ReactiveFormsModule, RouterTestingModule],
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
    fixture = TestBed.createComponent(BillingInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch checkout action and route to collections ', inject([Router], (mockRouter: Router) => {
    const spy = spyOn(mockRouter, 'navigate').and.stub();
    component.params = 'checkoutCart';
    component.buyNow();
    expect(spy.calls.first().args[0]).toContain('/collections');
  }));

  it('should dispatch checkout action and route to collections ', inject([Router], (mockRouter: Router) => {
    const spy = spyOn(mockRouter, 'navigate').and.stub();
    component.buyNow();
    expect(spy.calls.first().args[0]).toContain('/collections');
  }));
});
