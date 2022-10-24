import { InjectionToken } from '@angular/core';

export interface GlobalWindow extends Window {
  newrelic: NewRelic;
}

export const WINDOW = new InjectionToken<GlobalWindow>('Global Window Object');

export interface NewRelic {
  noticeError: (error: Error, customAttributes?: object) => void;
}
