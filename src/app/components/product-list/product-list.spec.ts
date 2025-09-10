import { ComponentFixture, TestBed } from '@angular/core/testing';

// CORRECTED: Import 'ProductList'
import { ProductList } from './product-list';

// CORRECTED: Describe 'ProductList'
describe('ProductList', () => {
  let component: ProductList;
  let fixture: ComponentFixture<ProductList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // CORRECTED: Import 'ProductList'
      imports: [ProductList]
    })
    .compileComponents();

    // CORRECTED: Create 'ProductList'
    fixture = TestBed.createComponent(ProductList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});