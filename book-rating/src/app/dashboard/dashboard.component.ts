import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';

import { Book } from '../shared/book';
import { BookStoreService } from '../shared/book-store.service';

@Component({
  selector: 'br-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  books = [];

  constructor(private store: BookStoreService) {
  }

  ngOnInit() {
    this.store
      // .getAllHardcoded()
      .getAllViaSwagger()
      // .getAllViaGraphQL()
      .pipe(tap(x => console.warn(x)));

      // BUG: subscribe code is never called, no data comes
      // .subscribe(books => this.books = books);
  }

  sortBooks(book: Book) {
    this.books = this.books
      .map(b => b.isbn === book.isbn ? book : b)
      .sort((a, b) => b.rating - a.rating);
  }

  addBook(book: Book) {
    this.books = [...this.books, book];
  }
}
