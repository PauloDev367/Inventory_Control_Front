import { Component, OnInit } from '@angular/core';
import { PaginateCategories, PaginateSuppliers } from '../../interfaces/paginated';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { NgFor, NgIf } from '@angular/common';
import { BrTimeFormatPipe } from '../../shared/pipes/br-time-format.pipe';
import { PaginationComponent } from '../../shared/components/pagination/pagination.component';
import { Category, Supplier } from '../../interfaces/models';
import { SuppliersService } from '../../services/suppliers.service';
import { SuppliersCreateComponent } from '../../shared/components/suppliers-create/suppliers-create.component';
import { SuppliersEditComponent } from '../../shared/components/suppliers-edit/suppliers-edit.component';

@Component({
  selector: 'app-suppliers',
  standalone: true,
  imports: [SuppliersCreateComponent, SuppliersEditComponent, NgIf, BrTimeFormatPipe, NgFor, PaginationComponent],
  templateUrl: './suppliers.component.html',
  styleUrl: './suppliers.component.css'
})
export class SuppliersComponent implements OnInit {
  public suppliers: PaginateSuppliers = {
    items: [],
    pageNumber: 0,
    pageSize: 0,
    totalItems: 0,
    totalPages: 0,
  };

  public supplierToEdit: Supplier = {
    createdAt: "",
    deletedAt: "",
    email: "",
    id: "",
    name: "",
    phoneNumber: "",
    products: null,
  };

  constructor(
    private readonly service: SuppliersService,
    private toastr: ToastrService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getProductSaleHistory(1);
  }

  async getProductSaleHistory(page = 1) {
    (await this.service.getAll(page)).subscribe({
      next: (result) => {
        this.suppliers = result;
      },
      error: (err: HttpErrorResponse) => {
        if (err.status == 401) {
          this.toastr.error('Please, do login again to continue');
          this.router.navigate([`/`]);
          return;
        }
        if (err.status == 404) {
          this.toastr.error('Product not founded');
          this.router.navigate([`/suppliers`]);
          return;
        }
        this.toastr.error('Error when try to find product sales history');
      }
    })
  }

  createdSupplier(category: Supplier) {
    this.suppliers.items.push(category);
  }

  async deleteCategory(supplierId: string) {
    const confirm = window.confirm('Do you really want to remove this category?');
    if (confirm) {
      (await this.service.delete(supplierId)).subscribe({
        next: (result) => {
          this.toastr.success('Category removed successfully');
          this.suppliers.items = this.suppliers.items.filter(sup => sup.id !== supplierId);

        },
        error: (err) => {
          if (err.status == 401) {
            this.toastr.error('Please, do login again to continue');
            this.router.navigate([`/`]);
            return;
          }
          if (err.status == 404) {
            this.toastr.error('Category not founded');
            this.router.navigate([`/suppliers`]);
            return;
          }
          this.toastr.error('Error when try to update category');
        }
      })
    }
  }

  async onPageChange(page: number) {
    await this.getProductSaleHistory(page);
  }
}
