import { Component, EventEmitter, Output } from '@angular/core';
import { CategoriesService } from '../../../services/categories.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Category } from '../../../interfaces/models';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

declare var $: any;

@Component({
  selector: 'app-categories-create',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './categories-create.component.html',
  styleUrl: './categories-create.component.css'
})
export class CategoriesCreateComponent {
  @Output() public createdCategory = new EventEmitter<Category>;

  public category: Category = {
    createdAt: "",
    deletedAt: "",
    id: "",
    name: "",
  };

  constructor(
    private readonly service: CategoriesService,
    private readonly toastr: ToastrService,
    private readonly router: Router
  ) {

  }
  async onSubmit() {
    (await this.service.create(this.category)).subscribe({
      next: (result) => {
        this.toastr.success('Category was created!');
        this.createdCategory.emit(result);
        $('#modalCreateCategory').modal('hide');

      },
      error: (err: HttpErrorResponse) => {
        if (err.status == 401) {
          this.toastr.error('Please, do login again to continue');
          this.router.navigate(['/']);
          return;
        }
        this.toastr.error('Error when try to create category');
      }
    });
  }
}
