import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { NgFor, NgIf } from '@angular/common';
import { PaginateSaleHistory, PaginateStockMovementHistory } from '../../interfaces/paginated';
import { BrTimeFormatPipe } from '../../shared/pipes/br-time-format.pipe';
import { PaginationComponent } from '../../shared/components/pagination/pagination.component';
import { MovementTypeFormatPipe } from '../../shared/pipes/movement-type-format.pipe';

@Component({
  selector: 'app-product-stock-history',
  standalone: true,
  imports: [NgIf, NgFor, BrTimeFormatPipe, PaginationComponent, MovementTypeFormatPipe],
  templateUrl: './product-stock-history.component.html',
  styleUrl: './product-stock-history.component.css'
})
export class ProductStockHistoryComponent implements OnInit {
  public id: string = "";
  public stockHistory: PaginateStockMovementHistory = {
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
    (await this.service.getProductStockHistory(this.id, page)).subscribe({
      next: (result) => {
        console.log(result);
        this.stockHistory = result;
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
        // if (err.status == 401) {
        //   this.toastr.error('Please, do login again to continue');
        //   this.router.navigate([`/products/${this.id}`]);
        //   return;
        // }
        // if (err.status == 404) {
        //   this.toastr.error('Product not founded');
        //   this.router.navigate([`/products/${this.id}`]);
        //   return;
        // }
        // this.toastr.error('Error when try to find product sales history');
      }
    })
  }

  async onPageChange(page: number) {
    await this.getProductSaleHistory(page);
  }
}
