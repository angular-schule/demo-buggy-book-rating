import { ApiModule, BASE_PATH } from '@angular-schule/book-monkey-api';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { environment } from './../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookComponent } from './book/book.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';

import { ApolloModule, Apollo } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    BookComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,

    // Swagger
    ApiModule,

    // Apollo
    HttpLinkModule,
    ApolloModule
  ],
  providers: [
    { provide: BASE_PATH, useValue: environment.API_BASE_PATH }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(apollo: Apollo, httpLink: HttpLink) {
    apollo.create({
      link: httpLink.create({uri: 'https://api.angular.schule/graphql'}),
      cache: new InMemoryCache()
    });

    crazyLoop();
  }
}











// FIXME: crazyLoop slows down the performance of our app dramatically,
// but we can spot it easily in the performance tab!
let x = 0;
function crazyLoop() {

  const newP = document.createElement('p');
  const newText = document.createTextNode('Hello, everything is slow!');
  newP.appendChild(newText);
  const body = document.getElementsByTagName('body')[0];
  for (let i = 0; i < 100; i++) {
    body.appendChild(newP);
    body.removeChild(newP);
  }

  if (x++ < 1000) {
    crazyLoop();
  }
}
