import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDetailsAddOrMinusQuantityComponent } from './product-details-add-or-minus-quantity.component';

describe('ProductDetailsAddOrMinusQuantityComponent', () => {
  let component: ProductDetailsAddOrMinusQuantityComponent;
  let fixture: ComponentFixture<ProductDetailsAddOrMinusQuantityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductDetailsAddOrMinusQuantityComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductDetailsAddOrMinusQuantityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
