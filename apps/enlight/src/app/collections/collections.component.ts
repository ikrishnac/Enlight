import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BooksFacade } from '../store/books.facade';

@Component({
  selector: 'enlight-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.scss']
})
export class CollectionsComponent implements OnInit, OnDestroy {

  collections: [];
  collectionSubscription: Subscription;

  constructor(private booksFacade: BooksFacade) { }

  ngOnInit(): void {
    this.collectionSubscription = this.booksFacade.getCollectionBooks$.subscribe(collection => {
      this.collections = collection;
    });
  }

  ngOnDestroy(): void {
    this.collectionSubscription.unsubscribe();
  }
}