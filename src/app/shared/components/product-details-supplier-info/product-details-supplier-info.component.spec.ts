import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDetailsSupplierInfoComponent } from './product-details-supplier-info.component';

describe('ProductDetailsSupplierInfoComponent', () => {
  let component: ProductDetailsSupplierInfoComponent;
  let fixture: ComponentFixture<ProductDetailsSupplierInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductDetailsSupplierInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductDetailsSupplierInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
