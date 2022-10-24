import { ErrorHandler, Inject, Injectable } from '@angular/core';
import { GlobalWindow, WINDOW } from './window.model';

@Injectable()
export class NewRelicErrorHandler extends ErrorHandler {
  constructor(@Inject(WINDOW) private readonly windowRef: GlobalWindow) {
    super();
  }

  handleError(error: any): void {
    this.windowRef.newrelic.noticeError(error);
    super.handleError(error); // keep log the error to the console
  }
}
