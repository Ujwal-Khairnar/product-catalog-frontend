// src/app/services/product.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  // ✅ Correct API base (ASP.NET exposes /api/products)
  private apiUrl = `${environment.apiBaseUrl}/api/products`;

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  createProduct(productData: { name: string; price: number }): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, productData);
  }

  updateProduct(id: number, productData: { name: string; price: number }): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, productData);
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  uploadImage(id: number, file: File): Observable<Product> {
    const formData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post<Product>(`${this.apiUrl}/${id}/image`, formData);
  }
}