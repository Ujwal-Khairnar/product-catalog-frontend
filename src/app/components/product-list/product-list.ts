// src/app/components/product-list/product-list.ts
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../services/product';
import { Product } from '../../models/product';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterLink, DecimalPipe],
  templateUrl: './product-list.html',
  styleUrls: ['./product-list.css']
})
export class ProductListComponent implements OnInit {
  private productService = inject(ProductService);
  
  products: Product[] = [];
  isLoading = true;

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.isLoading = true;
    this.productService.getProducts().subscribe({
      next: (data: Product[]) => {
        console.log('Products loaded:', data); // ✅ Debugging
        this.products = data;
        this.isLoading = false;
      },
      error: (err: any) => {
        console.error('Failed to load products', err);
        this.isLoading = false;
      }
    });
  }

  onDelete(id: number): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(id).subscribe({
        next: () => {
          this.products = this.products.filter(p => p.id !== id);
          alert('Product deleted successfully!');
        },
        error: (err: any) => {
          console.error('Failed to delete product', err);
          alert('Error deleting product.');
        }
      });
    }
  }
}