import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Iitems } from '../shared/books.model';
import { LoggerService } from '../shared/logger.service';
import { BooksFacade } from '../store/books.facade';

@Component({
  selector: 'enlight-book-info',
  templateUrl: './book-info.component.html',
  styleUrls: ['./book-info.component.css'],
})
export class BookInfoComponent implements OnInit, OnDestroy {
  bookId: string;
  bookDetails: Iitems;
  bookIdSubscription: Subscription;
  bookDetailsSubscription: Subscription;

  constructor(
    private router: Router,
    private booksFacade: BooksFacade,
    private loggerService: LoggerService
  ) {}

  ngOnInit(): void {
    this.bookIdSubscription = this.booksFacade.getSelectedBook$.subscribe(
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
    this.bookDetailsSubscription = this.booksFacade
      .getBooksInfo$(this.bookId)
      .subscribe(
        (details) => {
          this.bookDetails = details;
        },
        (error) => {
          this.loggerService.logError(error);
        }
      );
  }

  addToCard(bookId: string): void {
    this.booksFacade.addBooksToCart(bookId);
    this.router.navigate(['search']);
  }

  buyNow(bookId: string): void {
    this.router.navigate(['billing-info/' + bookId]);
  }

  ngOnDestroy(): void {
    this.bookIdSubscription.unsubscribe();
    this.bookDetailsSubscription.unsubscribe();
  }
}
