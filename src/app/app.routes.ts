import { Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list';
import { ProductFormComponent } from './components/product-form/product-form';

export const routes: Routes = [
  { path: '', component: ProductListComponent },
  { path: 'add-product', component: ProductFormComponent },
  { path: 'edit-product/:id', component: ProductFormComponent },
  { path: '**', redirectTo: '' }
];