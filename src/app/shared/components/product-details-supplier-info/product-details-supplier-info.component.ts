import { Component, Input, OnInit } from '@angular/core';
import { SuppliersService } from '../../../services/suppliers.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgIf, NgTemplateOutlet } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Supplier } from '../../../interfaces/models';
import { BrTimeFormatPipe } from '../../pipes/br-time-format.pipe';

@Component({
  selector: 'app-product-details-supplier-info',
  standalone: true,
  imports: [NgIf, BrTimeFormatPipe],
  templateUrl: './product-details-supplier-info.component.html',
  styleUrl: './product-details-supplier-info.component.css'
})

export class ProductDetailsSupplierInfoComponent implements OnInit {
  @Input() supplierId: String = '';
  public supplier: Supplier = {
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
    private readonly toastr: ToastrService,
    private readonly router: Router
  ) { }

  async ngOnInit() {
    if (this.supplierId != null && this.supplierId != '') {
      await this.getSupplier();
    }
  }

  async getSupplier() {
    (await this.service.getSupplierFromProduct(this.supplierId))
      .subscribe({
        next: (result) => {
          this.supplier = result;
        },
        error: (err: HttpErrorResponse) => {
          if (err.status == 401) {
            this.toastr.error('Please, do login again to continue');
            this.router.navigate(['/']);
            return;
          }

          if (err.status == 404) {
            this.toastr.error('Supplier not founded');
            return;
          }

          this.toastr.error('Error when try to get product supplier');
        }
      })
  }
}
