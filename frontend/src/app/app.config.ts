import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './routes/app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideStore } from '@ngrx/store';
import { reducers } from './store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import * as articlesEffects from '@app/store/effects/articleEffects';
import * as otherAuthorInfoEffects from '@app/store/effects/otherAuthorInfoEffects';
import * as userInfoEffects from '@app/store/effects/userInfoEffects';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(), provideStore(reducers), provideEffects(articlesEffects, otherAuthorInfoEffects, userInfoEffects), provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() })]
};
