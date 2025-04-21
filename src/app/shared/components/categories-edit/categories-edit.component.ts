import { Component, Input, input } from '@angular/core';
import { Category } from '../../../interfaces/models';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { CategoriesService } from '../../../services/categories.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories-edit',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './categories-edit.component.html',
  styleUrl: './categories-edit.component.css'
})
export class CategoriesEditComponent {
  @Input() public category: Category = {
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
    (await this.service.update(this.category)).subscribe({
      next: (result) => {
        this.toastr.success('Category was updated!');
      },
      error: (err: HttpErrorResponse) => {
        if (err.status == 401) {
          this.toastr.error('Please, do login again to continue');
          this.router.navigate(['/']);
          return;
        }
        this.toastr.error('Error when try to update category');
      }
    });
  }
}
