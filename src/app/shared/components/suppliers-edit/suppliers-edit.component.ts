import { Component, Input } from '@angular/core';
import { Supplier } from '../../../interfaces/models';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SuppliersService } from '../../../services/suppliers.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-suppliers-edit',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './suppliers-edit.component.html',
  styleUrl: './suppliers-edit.component.css'
})
export class SuppliersEditComponent {
  @Input() public supplier: Supplier = {
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
    (await this.service.update(this.supplier)).subscribe({
      next: (result) => {
        this.toastr.success('Supplier was updated!');
      },
      error: (err: HttpErrorResponse) => {
        if (err.status == 401) {
          this.toastr.error('Please, do login again to continue');
          this.router.navigate(['/']);
          return;
        }
        this.toastr.error('Error when try to update suppliers');
      }
    })
  }
}
