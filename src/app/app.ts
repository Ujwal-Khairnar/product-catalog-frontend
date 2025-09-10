// src/app/app.ts
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet], // It only needs RouterOutlet
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {
  // This class is now just a simple container
  title = 'product-catalog-frontend';
}