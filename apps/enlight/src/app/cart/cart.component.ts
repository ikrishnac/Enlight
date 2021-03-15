import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Iitems } from '../shared/books.model';
import { LoggerService } from '../shared/logger.service';
import { BooksFacade } from '../store/books.facade';

@Component({
  selector: 'enlight-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit, OnDestroy {
  cart: Iitems[];
  cartSubscription: Subscription;

  constructor(
    private router: Router,
    private booksFacade: BooksFacade,
    private loggerService: LoggerService
  ) {}

  ngOnInit(): void {
    this.cartSubscription = this.booksFacade.getCartBooks$.subscribe(
      (cart) => {
        this.cart = cart;
      },
      (error) => {
        this.loggerService.logError(error);
      }
    );
  }

  checkOutCart(): void {
    this.router.navigate(['billing-info/' + 'checkoutCart']);
  }

  ngOnDestroy(): void {
    this.cartSubscription.unsubscribe();
  }
}
