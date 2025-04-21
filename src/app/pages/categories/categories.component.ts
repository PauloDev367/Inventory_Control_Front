import { Component, OnInit } from '@angular/core';
import { PaginateCategories, PaginateSaleHistory } from '../../interfaces/paginated';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { NgFor, NgIf } from '@angular/common';
import { BrTimeFormatPipe } from '../../shared/pipes/br-time-format.pipe';
import { MovementTypeFormatPipe } from '../../shared/pipes/movement-type-format.pipe';
import { BrMoneyFormatterPipe } from '../../shared/pipes/br-money-formatter.pipe';
import { PaginationComponent } from '../../shared/components/pagination/pagination.component';
import { CategoriesService } from '../../services/categories.service';
import { CategoriesEditComponent } from '../../shared/components/categories-edit/categories-edit.component';
import { Category } from '../../interfaces/models';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CategoriesEditComponent, NgIf, BrTimeFormatPipe, MovementTypeFormatPipe, NgFor, BrMoneyFormatterPipe, PaginationComponent],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent implements OnInit {
  public categories: PaginateCategories = {
    items: [],
    pageNumber: 0,
    pageSize: 0,
    totalItems: 0,
    totalPages: 0,
  };

  public categoryToEdit: Category = {
    createdAt: "",
    deletedAt: "",
    id: "",
    name: "",
  };

  constructor(
    private readonly service: CategoriesService,
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
        this.categories = result;
      },
      error: (err: HttpErrorResponse) => {
        if (err.status == 401) {
          this.toastr.error('Please, do login again to continue');
          this.router.navigate([`/`]);
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
