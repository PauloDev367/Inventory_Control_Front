import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductsService } from '../../services/products.service';
import { PaginatePriceHistory, PaginateSaleHistory } from '../../interfaces/paginated';
import { PaginationComponent } from '../../shared/components/pagination/pagination.component';
import { BrMoneyFormatterPipe } from '../../shared/pipes/br-money-formatter.pipe';
import { BrTimeFormatPipe } from '../../shared/pipes/br-time-format.pipe';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-product-price-history',
  standalone: true,
  imports: [NgIf, NgFor, BrTimeFormatPipe, BrMoneyFormatterPipe, PaginationComponent],
  templateUrl: './product-price-history.component.html',
  styleUrl: './product-price-history.component.css'
})
export class ProductPriceHistoryComponent implements OnInit {
  public id: string = "";
  public salesHistory: PaginatePriceHistory = {
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
    this.getProductPriceHistory(1);
  }

  async getProductPriceHistory(page = 1) {
    (await this.service.getProductPriceHistory(this.id, page)).subscribe({
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
    await this.getProductPriceHistory(page);
  }
}

