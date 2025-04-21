import { Component, Input, OnInit } from '@angular/core';
import { ProductsService } from '../../../services/products.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Category } from '../../../interfaces/models';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-product-details-category',
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './product-details-category.component.html',
  styleUrl: './product-details-category.component.css'
})
export class ProductDetailsCategoryComponent implements OnInit {
  @Input() productId: String = '';
  public categories: Array<Category> = [];

  constructor(
    private service: ProductsService,
    private toastr: ToastrService,
    private router: Router
  ) { }
  async ngOnInit() {
    await this.getProductCategories();
  }

  async getProductCategories() {
    (await this.service.getProductCategories(this.productId)).subscribe({
      next: (result) => {
        this.categories = result;
      },
      error: (err) => {
        if (err.status == 401) {
          this.toastr.error('Please, do login again to continue');
          this.router.navigate(['/']);
          return;
        }
        this.toastr.error('Error when try to get product categories');
      }
    });
  }
}
