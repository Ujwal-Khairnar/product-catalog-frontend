// src/main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app'; // <-- Correctly imports AppComponent

bootstrapApplication(AppComponent, appConfig) // <-- Correctly uses AppComponent
  .catch((err) => console.error(err));