import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product-form.html',
  styleUrls: ['./product-form.css']
})
export class ProductFormComponent implements OnInit {
  @Input() product: Product | null = null;

  productForm!: FormGroup;
  currentImageUrl: string | null = null;
  selectedFile: File | null = null;
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: [this.product?.name || '', [Validators.required, Validators.minLength(3)]],
      price: [this.product?.price || '', [Validators.required, Validators.min(1)]]
    });

    this.currentImageUrl = this.product?.imageUrl ?? null;
    this.isEditMode = !!this.product;
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  // ✅ renamed to match template
  onSubmit(): void {
    if (!this.product) {
      // create
      this.productService.createProduct(this.productForm.value).subscribe({
        next: (newProduct) => {
          if (this.selectedFile) {
            this.uploadImage(newProduct.id);
          }
        },
        error: (err) => console.error('Error creating product:', err)
      });
    } else {
      // update
      this.productService.updateProduct(this.product.id, this.productForm.value).subscribe({
        next: () => {
          if (this.selectedFile) {
            this.uploadImage(this.product!.id);
          }
        },
        error: (err) => console.error('Error updating product:', err)
      });
    }
  }

  // ✅ wrapper for upload button
  onUpload(): void {
    if (this.product) {
      this.uploadImage(this.product.id);
    }
  }

  private uploadImage(productId: number): void {
    if (this.selectedFile) {
      this.productService.uploadImage(productId, this.selectedFile).subscribe({
        next: (updatedProduct) => {
          this.currentImageUrl = updatedProduct.imageUrl ?? null;
        },
        error: (err) => console.error('Error uploading image:', err)
      });
    }
  }
}