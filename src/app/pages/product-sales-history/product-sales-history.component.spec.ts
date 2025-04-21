import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSalesHistoryComponent } from './product-sales-history.component';

describe('ProductSalesHistoryComponent', () => {
  let component: ProductSalesHistoryComponent;
  let fixture: ComponentFixture<ProductSalesHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductSalesHistoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductSalesHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
