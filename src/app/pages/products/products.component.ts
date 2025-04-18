import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { PaginateProducts } from '../../interfaces/paginated';
import { ToastrService } from 'ngx-toastr';
import { NgFor, NgIf } from '@angular/common';
import { BrTimeFormatPipe } from '../../shared/pipes/br-time-format.pipe';
import { BrMoneyFormatterPipe } from '../../shared/pipes/br-money-formatter.pipe';
import { PaginationComponent } from '../../shared/components/pagination/pagination.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [NgFor, NgIf, BrTimeFormatPipe, BrMoneyFormatterPipe, PaginationComponent],

  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  public products: PaginateProducts | any;

  constructor(
    private service: ProductsService,
    private toastr: ToastrService
  ) { }

  async ngOnInit() {
    await this.getProducts(1);
  }

  async getProducts(page: number) {
    (await this.service.getAll(page)).subscribe({
      next: (result) => {
        this.products = result;
      },
      error: (err) => {
        this.toastr.error('Error when try to find products')
      }
    })
  }

  async onPageChange(page: number) {
    console.log(page);
    await this.getProducts(page);
  }
}
