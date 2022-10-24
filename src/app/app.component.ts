import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  notAFunctionError(): void {
    const someArray = [{ func: () => {} }];
    someArray[1].func();
  }

  uriError(): void {
    decodeURIComponent('%');
  }

  syntaxError(): void {
    eval('foo bar');
  }

  rangeError(): void {
    throw new RangeError('Parameter must be between 1 and 100');
  }
}
