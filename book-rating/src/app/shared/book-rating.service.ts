import { Injectable } from '@angular/core';
import { Book } from './book';

@Injectable({
  providedIn: 'root'
})
export class BookRatingService {

  private minRating = 1;
  private maxRating = 5;

  rateUp(book: Book): Book {

    // FIXME: hard to find, until we active "pause on caught exceptions"
    try {
      if (1 === 1) {
        throw Error('ups!');
      }

      return {
        ...book,
        rating: Math.min(this.maxRating, book.rating + 1)
      };

    } catch {
      return book;
    }
  }

  rateDown(book: Book): Book {
    return {
      ...book,
      rating: book.rating > 1 ? book.rating - 1 : book.rating
    };
  }

  rateDownAllowed(book: Book) {
    return book.rating > this.minRating;
  }

  rateUpAllowed(book: Book) {
    return book.rating < this.maxRating;
  }

}
