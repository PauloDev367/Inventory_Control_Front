import { NgIf } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ProductsService } from '../../../services/products.service';
import { CreateProduct } from '../../../interfaces/createinterfaces';
import { Product } from '../../../interfaces/models';

@Component({
  selector: 'app-create-product-modal',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './create-product-modal.component.html',
  styleUrl: './create-product-modal.component.css'
})
export class CreateProductModalComponent {

  @Output() createdProduct = new EventEmitter<Product>;

  public product: CreateProduct = {
    name: '',
    description: '',
    quantity: 0,
    price: 0,
    minimumStock: 0,
  }
  constructor(
    private toastr: ToastrService,
    private service: ProductsService
  ) {

  }

  async onSumbmitForm() {
    (await this.service.create(this.product)).subscribe({
      next: (result) => {
        if (result) {
          this.toastr.success('Product was created successfully!');
          this.createdProduct.emit({
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
        }
      },
      error: (err) => {
        this.toastr.error('Error when try to create product! Check if you are sending all formfields');
      }
    })
  }
}
