import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { NewRelicErrorHandler } from 'src/app/shared/new-relic.error-handler';
import { WINDOW } from 'src/app/shared/window.model';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule],
  providers: [
    {
      provide: ErrorHandler,
      useClass: NewRelicErrorHandler,
    },
    {
      provide: WINDOW,
      useValue: window,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
