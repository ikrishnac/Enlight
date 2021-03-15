import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ibooks } from '../shared/books.model';
import { LoggerService } from '../shared/logger.service';
import { BooksFacade } from '../store/books.facade';

@Component({
  selector: 'enlight-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit, OnDestroy {
  searchForm: FormGroup;
  books: Ibooks;
  booksSubscription$: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private booksFacade: BooksFacade,
    private loggerService: LoggerService
  ) {}
  ngOnInit(): void {
    this.booksSubscription$ = this.booksFacade.getBooks$.subscribe(
      (books) => {
        this.books = books;
      },
      (error) => {
        this.loggerService.logError(error);
      }
    );
    this.searchForm = this.formBuilder.group({
      search: ['', [Validators.required]],
    });
  }

  getBooks(): void {
    if (!this.searchForm.valid) {
      return;
    } else {
      this.booksFacade.loadBooks(this.searchForm.value.search);
    }
  }

  ngOnDestroy(): void {
    this.booksSubscription$.unsubscribe();
  }
}
