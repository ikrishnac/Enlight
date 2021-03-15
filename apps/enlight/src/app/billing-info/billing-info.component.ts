import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoggerService } from '../shared/logger.service';
import { BooksFacade } from '../store/books.facade';

@Component({
  selector: 'enlight-billing-info',
  templateUrl: './billing-info.component.html',
  styleUrls: ['./billing-info.component.css'],
})
export class BillingInfoComponent implements OnInit, OnDestroy {
  params: string;
  billingInfoForm: FormGroup;
  bookId: string;
  paramSubscription: Subscription;
  selectedBookSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    public booksFacade: BooksFacade,
    private loggerService: LoggerService
  ) {}

  ngOnInit(): void {
    this.billingInfoForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      address: ['', [Validators.required]],
    });
    this.paramSubscription = this.route.params.subscribe(
      (params) => {
        this.params = params.id;
      },
      (error) => {
        this.loggerService.logError(error);
      }
    );
    this.selectedBookSubscription = this.booksFacade.getSelectedBook$.subscribe(
      (bookId) => {
        this.bookId = bookId;
      },
      (error) => {
        this.loggerService.logError(error);
      }
    );
    if (!this.bookId) {
      this.router.navigate(['/search']);
    }
  }

  buyNow(): void {
    if (this.params === 'checkoutCart') {
      this.booksFacade.checkoutCart(this.params, this.billingInfoForm.value);
      this.router.navigate(['/collections']);
    } else {
      this.booksFacade.buyBookNow(this.params, this.billingInfoForm.value);
      this.router.navigate(['/collections']);
    }
  }

  ngOnDestroy(): void {
    this.paramSubscription.unsubscribe();
    this.selectedBookSubscription.unsubscribe();
  }
}
