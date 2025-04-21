import { Component, EventEmitter, Output } from '@angular/core';
import { Supplier } from '../../../interfaces/models';
import { SuppliersService } from '../../../services/suppliers.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

declare var $: any;

@Component({
  selector: 'app-suppliers-create',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './suppliers-create.component.html',
  styleUrl: './suppliers-create.component.css'
})
export class SuppliersCreateComponent {
  @Output() public createdSupplier = new EventEmitter<Supplier>;

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
  ) {

  }
  async onSubmit() {
    (await this.service.create(this.supplier)).subscribe({
      next: (result) => {
        this.toastr.success('Supplier was created!');
        this.createdSupplier.emit(result);
        $('#modalCreateSupplier').modal('hide');

      },
      error: (err: HttpErrorResponse) => {
        if (err.status == 401) {
          this.toastr.error('Please, do login again to continue');
          this.router.navigate(['/']);
          return;
        }
        this.toastr.error('Error when try to create supplier');
      }
    });
  }
}
