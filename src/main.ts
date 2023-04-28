import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(appRoutes),
    importProvidersFrom(
      HttpClientModule,
      FlexLayoutModule,
      BrowserAnimationsModule
    ),
  ],
});
