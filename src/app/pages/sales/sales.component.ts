import { Component, OnInit } from '@angular/core';
import { SalesService } from '../../services/sales.service';
import { PaginateSaleHistory } from '../../interfaces/paginated';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { NgFor, NgIf } from '@angular/common';
import { BrTimeFormatPipe } from '../../shared/pipes/br-time-format.pipe';
import { MovementTypeFormatPipe } from '../../shared/pipes/movement-type-format.pipe';
import { BrMoneyFormatterPipe } from '../../shared/pipes/br-money-formatter.pipe';
import { PaginationComponent } from '../../shared/components/pagination/pagination.component';

@Component({
  selector: 'app-sales',
  standalone: true,
  imports: [NgIf, BrTimeFormatPipe, MovementTypeFormatPipe, NgFor, BrMoneyFormatterPipe, PaginationComponent],
  templateUrl: './sales.component.html',
  styleUrl: './sales.component.css'
})
export class SalesComponent implements OnInit {
  public salesHistory: PaginateSaleHistory = {
    items: [],
    pageNumber: 0,
    pageSize: 0,
    totalItems: 0,
    totalPages: 0,
  };

  constructor(
    private readonly service: SalesService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.getProductSaleHistory(1);
  }

  async getProductSaleHistory(page = 1) {
    (await this.service.getAll(page)).subscribe({
      next: (result) => {
        this.salesHistory = result;
      },
      error: (err: HttpErrorResponse) => {
        if (err.status == 401) {
          this.toastr.error('Please, do login again to continue');
          this.router.navigate([`/sales`]);
          return;
        }
        if (err.status == 404) {
          this.toastr.error('Product not founded');
          this.router.navigate([`/sales`]);
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
