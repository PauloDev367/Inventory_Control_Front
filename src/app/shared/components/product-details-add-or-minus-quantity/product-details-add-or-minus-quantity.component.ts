import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductsService } from '../../../services/products.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Product } from '../../../interfaces/models';

declare var $: any;

@Component({
  selector: 'app-product-details-add-or-minus-quantity',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './product-details-add-or-minus-quantity.component.html',
  styleUrl: './product-details-add-or-minus-quantity.component.css'
})
export class ProductDetailsAddOrMinusQuantityComponent {
  @Input() public productId: string = '';
  @Output() updatedProduct = new EventEmitter<Product>;
  public quantityToAdd: number = 0;

  constructor(
    private readonly service: ProductsService,
    private readonly toastr: ToastrService,
    private readonly router: Router
  ) { }

  async addQuantity() {
    (await this.service.addQuantityToProduct(this.productId, this.quantityToAdd)).subscribe({
      next: (result) => {
        this.updatedProduct.emit({
          createdAt: result.createdAt,
          deletedAt: result.deletedAt,
          description: result.description,
          id: result.id,
          minimumStock: result.minimumStock,
          name: result.name,
          price: result.price,
          quantity: result.quantity,
          supplierId: result.supplierId,
        });
        this.closeModal('#addQuantityModal');
        this.quantityToAdd = 0;
        this.toastr.success('Product updated successfully');
      },
      error: (err: HttpErrorResponse) => {
        if (err.status == 401) {
          this.toastr.error('Please, do login again to continue');
          this.router.navigate(['/']);
          return;
        }
        this.toastr.error('Error when try to add stock to product');
      }
    })
  }

  private closeModal(modalName: string): void {
    $(modalName).modal('hide');
  }

}
