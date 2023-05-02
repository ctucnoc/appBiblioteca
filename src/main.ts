import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app/app.routes';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { customMatPaginatorInitl } from './app/shared/config/LibraryConfig';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(appRoutes),
    importProvidersFrom(FlexLayoutModule, BrowserAnimationsModule),
    provideHttpClient(),
    { provide: MatPaginatorIntl, useValue: customMatPaginatorInitl() },
  ],
});
