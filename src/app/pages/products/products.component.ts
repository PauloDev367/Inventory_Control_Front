import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { PaginateProducts } from '../../interfaces/paginated';
import { ToastrService } from 'ngx-toastr';
import { NgFor, NgIf } from '@angular/common';
import { BrTimeFormatPipe } from '../../shared/pipes/br-time-format.pipe';
import { BrMoneyFormatterPipe } from '../../shared/pipes/br-money-formatter.pipe';
import { PaginationComponent } from '../../shared/components/pagination/pagination.component';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { CreateProductModalComponent } from '../../shared/components/create-product-modal/create-product-modal.component';
import { Product } from '../../interfaces/models';
import { TextLimiterPipe } from '../../shared/pipes/text-limiter.pipe';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    NgFor, NgIf, BrTimeFormatPipe, BrMoneyFormatterPipe, PaginationComponent,
    CreateProductModalComponent, TextLimiterPipe
  ],

  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  public products: PaginateProducts | any;

  constructor(
    private service: ProductsService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  async ngOnInit() {
    await this.getProducts(1);
  }

  async getProducts(page: number) {
    (await this.service.getAll(page)).subscribe({
      next: (result) => {
        this.products = result;
      },
      error: (err: HttpErrorResponse) => {
        if (err.status == 401) {
          this.toastr.error('Please, do login again to continue');
          this.router.navigate(['/']);
          return;
        }
        this.toastr.error('Error when try to find products')
      }
    })
  }

  async onPageChange(page: number) {
    await this.getProducts(page);
  }

  async newProduct(newProduct: Product) {
    this.products.items.unshift(newProduct);
  }
}
