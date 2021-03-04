import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BooksFacade } from '../store/books.facade';

@Component({
  selector: 'enlight-book-cards',
  templateUrl: './book-cards.component.html',
  styleUrls: ['./book-cards.component.scss']
})
export class BookCardsComponent implements OnInit {

  @Input() books: any;
  @Input() displayType: any;
  fxFlexValue = '30%';
  constructor(private router: Router, private booksFacade: BooksFacade) { }

  ngOnInit(): void {
    this.fxFlexValue = this.displayType === 'searchComponent' ? '30%' : '100%';
  }

  handleClick(bookId: any, displayType: any): void {
    if (displayType === 'searchComponent') {
      this.booksFacade.loadBookDetails(bookId);
      this.router.navigate(['search/book-info/' + bookId]);
    } else {
      this.booksFacade.removeBookFromCart(bookId);
    }
  }
}
