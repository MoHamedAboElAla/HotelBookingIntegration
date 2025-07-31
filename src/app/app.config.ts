
import { accountInterceptor } from './services/account-interceptor';

import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection, importProvidersFrom } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { provideHttpClient, withInterceptors, withFetch } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';
=======
import { ApplicationConfig, importProvidersFrom, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { provideHttpClient, withInterceptors, withFetch } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';
import { accountInterceptor } from './services/account-interceptor';


import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),

    provideClientHydration(withEventReplay()),
    provideToastr(),
    importProvidersFrom(FormsModule),
    provideRouter(
      routes,
      withInMemoryScrolling({
        anchorScrolling: 'enabled',
        scrollPositionRestoration: 'enabled'
      })
    ),
    provideHttpClient(
      withInterceptors([accountInterceptor]),
      withFetch()
    )
  ]
};
=======

    importProvidersFrom(FormsModule),
    provideToastr(),

    provideHttpClient(
      withInterceptors([accountInterceptor]),
      withFetch()
    ),


    provideRouter(
      routes,
      withInMemoryScrolling({
        anchorScrolling: 'enabled',

        scrollPositionRestoration: 'enabled'
      })
    ),
    provideClientHydration(withEventReplay())
  ]
};

        scrollPositionRestoration: 'enabled',
      })
    ),

    provideClientHydration(withEventReplay())
  ]
};

