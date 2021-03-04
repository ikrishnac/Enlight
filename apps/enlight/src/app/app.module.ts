import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatBadgeModule } from '@angular/material/badge';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { CollectionsComponent } from './collections/collections.component';
import { SearchComponent } from './search/search.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BookCardsComponent } from './book-cards/book-cards.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { booksReducer } from './store/books.reducer';
import { EffectsModule } from '@ngrx/effects';
import { BooksEffect } from './store/books.effects';
import { BookInfoComponent } from './book-info/book-info.component';
import { BillingInfoComponent } from './billing-info/billing-info.component';


const routes: Routes = [
  { path: 'search', component: SearchComponent },
  { path: 'cart', component: CartComponent },
  { path: 'collections', component: CollectionsComponent },
  { path: 'search/book-info/:id', component: BookInfoComponent },
  { path: 'billing-info/:id', component: BillingInfoComponent },
];

@NgModule({
  declarations: [AppComponent, NavBarComponent, CartComponent, CollectionsComponent, SearchComponent, BookCardsComponent, BookInfoComponent, BillingInfoComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    LayoutModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatInputModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatCardModule,
    MatBadgeModule,
    RouterModule.forRoot(routes),
    StoreModule.forRoot({}),
    StoreDevtoolsModule.instrument(),
    StoreModule.forFeature("books", booksReducer),
    EffectsModule.forRoot([BooksEffect]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
