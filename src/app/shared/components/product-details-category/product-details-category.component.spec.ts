import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDetailsCategoryComponent } from './product-details-category.component';

describe('ProductDetailsCategoryComponent', () => {
  let component: ProductDetailsCategoryComponent;
  let fixture: ComponentFixture<ProductDetailsCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductDetailsCategoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductDetailsCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
