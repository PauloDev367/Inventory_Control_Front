import { Component, OnInit } from '@angular/core';
import { SalesService } from '../../services/sales.service';
import { PaginateStockMovement } from '../../interfaces/paginated';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { NgFor, NgIf } from '@angular/common';
import { BrTimeFormatPipe } from '../../shared/pipes/br-time-format.pipe';
import { MovementTypeFormatPipe } from '../../shared/pipes/movement-type-format.pipe';
import { PaginationComponent } from '../../shared/components/pagination/pagination.component';
import { StockMovementService } from '../../services/stock-movement.service';

@Component({
  selector: 'app-stock-movement',
  standalone: true,
  imports: [NgIf, BrTimeFormatPipe, NgFor, MovementTypeFormatPipe, PaginationComponent],
  templateUrl: './stock-movement.component.html',
  styleUrl: './stock-movement.component.css'
})
export class StockMovementComponent implements OnInit {
  public stockMovements: PaginateStockMovement = {
    items: [],
    pageNumber: 0,
    pageSize: 0,
    totalItems: 0,
    totalPages: 0,
  };

  constructor(
    private readonly service: StockMovementService,
    private toastr: ToastrService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getStockMovement(1);
  }

  async getStockMovement(page = 1) {
    (await this.service.getAll(page)).subscribe({
      next: (result) => {
        this.stockMovements = result;
      },
      error: (err: HttpErrorResponse) => {
        if (err.status == 401) {
          this.toastr.error('Please, do login again to continue');
          this.router.navigate([`/`]);
          return;
        }
        this.toastr.error('Error when try to find stock movement');
      }
    })
  }

  async onPageChange(page: number) {
    await this.getStockMovement(page);
  }
}
