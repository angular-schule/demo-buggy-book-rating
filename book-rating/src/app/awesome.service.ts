import { Injectable, NgZone } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AwesomeService {

  constructor(private zone: NgZone) {}

  doAwesomeStuff() {
    // courtesy of https://blog.meteor.com/an-interesting-kind-of-javascript-memory-leak-8b47d2e7f156
    this.zone.runOutsideAngular(() => {
      var theThing = null;
      var replaceThing = function () {
        var originalThing = theThing;
        var unused = function () {
          if (originalThing)
            console.log("hi");
        };
        theThing = {
          longStr: new Array(100000000).join('*'),
          someMethod: function () {
            console.log('hello');
          }
        };
      };
      setInterval(replaceThing, 300);
    })
  }
}
