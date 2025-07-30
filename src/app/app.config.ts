import { accountInterceptor } from './services/account-interceptor'; // تأكد من المسار

import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter, withInMemoryScrolling} from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { provideHttpClient, withInterceptors, withFetch } from '@angular/common/http'; // ✅ أضف هذا


export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes, withInMemoryScrolling({
      anchorScrolling: 'enabled',
      scrollPositionRestoration: 'enabled'
    })),
    provideClientHydration(withEventReplay()),
    
    provideHttpClient(
      withInterceptors([accountInterceptor])
    )
  ]
};


