import { Component, OnInit } from '@angular/core';
import { tap, map, filter, reduce } from 'rxjs/operators';

import { Book } from '../shared/book';
import { BookStoreService } from '../shared/book-store.service';
import { from, Observable, of } from 'rxjs';
import { AwesomeService } from '../awesome.service';

@Component({
  selector: 'br-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  books = [];
  strings: string[] = []

  constructor(private store: BookStoreService, private as: AwesomeService) {
  }

  ngOnInit() {

    // AWESOME MEMORY LEAKS
    // this.as.doAwesomeStuff();

    this.store
      // .getAllHardcoded()
      .getAllViaSwagger()
      // .getAllViaGraphQL()
      .pipe(tap(x => console.warn(x)))

      // FIXME: subscribe code is never called, no data comes
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
