import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';
import { ToastrModule } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';


ToastrModule.forRoot({
  positionClass: 'toast-bottom-right',
  closeButton: true,
  progressBar: true,
  timeOut: 3000,
  easeTime: 300,
  tapToDismiss: true,
})

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideAnimations(),
    importProvidersFrom(
      ToastrModule.forRoot({
        positionClass: 'toast-bottom-right',
        closeButton: true,
        progressBar: true
      })
    )
  ],
};
