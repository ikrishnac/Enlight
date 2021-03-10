import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { BooksFacade } from '../store/books.facade';
import { Iitems } from '../shared/books.model';

@Component({
  selector: 'enlight-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit, OnDestroy {

  cart: Iitems[];
  collections: Iitems[];
  cartSubscription: Subscription;
  collectionSubscription: Subscription;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, private booksFacade: BooksFacade) { }

  ngOnInit(): void {
    this.cartSubscription = this.booksFacade.getCartBooks$.subscribe(cart => {
      this.cart = cart;
    });
    this.collectionSubscription = this.booksFacade.getCollectionBooks$.subscribe(collection => {
      this.collections = collection;
    });
  }

  ngOnDestroy(): void {
    this.cartSubscription.unsubscribe();
    this.collectionSubscription.unsubscribe();
  }
}
