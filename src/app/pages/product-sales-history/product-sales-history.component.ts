import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { NgFor, NgIf } from '@angular/common';
import { PaginateSaleHistory } from '../../interfaces/paginated';
import { BrTimeFormatPipe } from '../../shared/pipes/br-time-format.pipe';
import { BrMoneyFormatterPipe } from '../../shared/pipes/br-money-formatter.pipe';
import { PaginationComponent } from '../../shared/components/pagination/pagination.component';

@Component({
  selector: 'app-product-sales-history',
  standalone: true,
  imports: [NgIf, NgFor, BrTimeFormatPipe, BrMoneyFormatterPipe, PaginationComponent],
  templateUrl: './product-sales-history.component.html',
  styleUrl: './product-sales-history.component.css'
})
export class ProductSalesHistoryComponent implements OnInit {
  public id: string = "";
  public salesHistory: PaginateSaleHistory = {
    items: [],
    pageNumber: 0,
    pageSize: 0,
    totalItems: 0,
    totalPages: 0,
  };
  constructor(
    private route: ActivatedRoute,
    private service: ProductsService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') ?? "";
    this.getProductSaleHistory(1);
  }

  async getProductSaleHistory(page = 1) {
    (await this.service.getProductSalesHistory(this.id, page)).subscribe({
      next: (result) => {
        this.salesHistory = result;
      },
      error: (err: HttpErrorResponse) => {
        if (err.status == 401) {
          this.toastr.error('Please, do login again to continue');
          this.router.navigate([`/products/${this.id}`]);
          return;
        }
        if (err.status == 404) {
          this.toastr.error('Product not founded');
          this.router.navigate([`/products/${this.id}`]);
          return;
        }
        this.toastr.error('Error when try to find product sales history');
      }
    })
  }

  async onPageChange(page: number) {
    await this.getProductSaleHistory(page);
  }
}
