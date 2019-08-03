import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable, from } from 'rxjs';
import { map, switchMap, mergeAll, toArray } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  books$: Observable<any>;

  constructor(http: HttpClient) {
    this.books$ = http.get('http://localhost:3000/books').pipe(
      switchMap((books: any[]) => {
        return http.get('http://localhost:3000/persons').pipe(
          switchMap((persons: any[]) => {
            return from(
              books.map((book) => {
                const author = persons.find((person) => person.name === book.author.name);
                return http
                  .post('http://localhost:3000/nationality', { code: author.nationality })
                  .pipe(map((nationality) => ({ ...book, author: { ...author, nationality } })));
              })
            ).pipe(
              mergeAll(),
              toArray()
            );
          })
        );
      })
    );

    this.books$.subscribe((response) => console.log(response));
  }
}
