import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Iitems } from '../shared/books.model';
import { LoggerService } from '../shared/logger.service';
import { BooksFacade } from '../store/books.facade';

@Component({
  selector: 'enlight-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.scss'],
})
export class CollectionsComponent implements OnInit, OnDestroy {
  collections: Iitems[];
  collectionSubscription: Subscription;

  constructor(
    private booksFacade: BooksFacade,
    private loggerService: LoggerService
  ) {}

  ngOnInit(): void {
    this.collectionSubscription = this.booksFacade.getCollectionBooks$.subscribe(
      (collection) => {
        this.collections = collection;
      },
      (error) => {
        this.loggerService.logError(error);
      }
    );
  }

  ngOnDestroy(): void {
    this.collectionSubscription.unsubscribe();
  }
}
