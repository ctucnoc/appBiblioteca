import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { appRoutes } from './app/app.routes';
import { provideRouter } from '@angular/router';
import { CommonModule } from '@angular/common';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(appRoutes),
    importProvidersFrom(
      HttpClientModule,
      FlexLayoutModule,
      BrowserModule,
      BrowserAnimationsModule,
      CommonModule
    ),
  ],
});
