import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Product } from '../../interfaces/models';
import { NgIf } from '@angular/common';
import { BrTimeFormatPipe } from '../../shared/pipes/br-time-format.pipe';
import { ProductDetailsSupplierInfoComponent } from '../../shared/components/product-details-supplier-info/product-details-supplier-info.component';
import { ProductDetailsCategoryComponent } from '../../shared/components/product-details-category/product-details-category.component';
import { FormsModule } from '@angular/forms';
import { ProductDetailsAddOrMinusQuantityComponent } from '../../shared/components/product-details-add-or-minus-quantity/product-details-add-or-minus-quantity.component';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [
    NgIf, BrTimeFormatPipe, ProductDetailsSupplierInfoComponent,
    ProductDetailsCategoryComponent, FormsModule, ProductDetailsAddOrMinusQuantityComponent
  ],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {
  private id: String = "";
  public isToEdit: boolean = false;
  public product: Product = {
    createdAt: "",
    deletedAt: "",
    description: "",
    id: "",
    minimumStock: 0,
    name: "",
    price: 0,
    quantity: 0,
    supplierId: ""
  }
  constructor(
    private route: ActivatedRoute,
    private service: ProductsService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') ?? "";
    this.getProductData();
  }

  handleIsToEdit() {
    this.isToEdit = !this.isToEdit;
  }

  async onSumbmitForm() {
    (await this.service.updateProduct({
      description: this.product.description,
      minimumStock: this.product.minimumStock,
      name: this.product.name,
      price: this.product.price
    }, this.product.id)).subscribe({
      next: (result) => {
        this.toastr.success('Product updated successfully!');
        this.isToEdit = false;
      },
      error: (err) => {
        if (err.status == 401) {
          this.toastr.error('Please, do login again to continue');
          this.router.navigate(['/']);
          return;
        }
        if (err.status == 404) {
          this.toastr.error('Product not founded');
          this.router.navigate(['/products']);
          return;
        }

        this.toastr.error('Error when try to update product');
      }
    });
  }

  async updatedProduct(product: Product){
    this.product = product;
  }

  private async getProductData() {
    (await this.service.getOne(this.id)).subscribe({
      next: (result) => {
        this.product = result;
      },
      error: (err: HttpErrorResponse) => {
        if (err.status == 401) {
          this.toastr.error('Please, do login again to continue');
          this.router.navigate(['/']);
          return;
        }
        if (err.status == 404) {
          this.toastr.error('Product not founded');
          this.router.navigate(['/products']);
          return;
        }
        this.toastr.error('Error when try to get products');
      }
    })
  }
}
