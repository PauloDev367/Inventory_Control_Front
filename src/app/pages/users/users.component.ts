import { Component, OnInit } from '@angular/core';
import { PaginateUser } from '../../interfaces/paginated';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { NgFor, NgIf } from '@angular/common';
import { BrTimeFormatPipe } from '../../shared/pipes/br-time-format.pipe';
import { PaginationComponent } from '../../shared/components/pagination/pagination.component';
import { UpdateUser, User } from '../../interfaces/models';
import { UsersService } from '../../services/users.service';
import { UsersCreateComponent } from '../../shared/components/users-create/users-create.component';
import { UsersEditComponent } from '../../shared/components/users-edit/users-edit.component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [UsersCreateComponent, UsersEditComponent, NgIf, BrTimeFormatPipe, NgFor, PaginationComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit {
  public users: PaginateUser = {
    items: [],
    pageNumber: 0,
    pageSize: 0,
    totalItems: 0,
    totalPages: 0,
  };

  public userToEdit: UpdateUser = {
    email: "",
    id: "",
    name: "",
    password: "",
  };

  constructor(
    private readonly service: UsersService,
    private toastr: ToastrService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getProductSaleHistory(1);
  }

  async getProductSaleHistory(page = 1) {
    (await this.service.getAll(page)).subscribe({
      next: (result) => {
        this.users = result;
      },
      error: (err: HttpErrorResponse) => {
        if (err.status == 401) {
          this.toastr.error('Please, do login again to continue');
          this.router.navigate([`/`]);
          return;
        }
        if (err.status == 404) {
          this.toastr.error('Product not founded');
          this.router.navigate([`/users`]);
          return;
        }
        this.toastr.error('Error when try to find product sales history');
      }
    })
  }

  async delete(userId: string) {
    const confirm = window.confirm('Do you really want to remove this user?');
    if (confirm) {
      (await this.service.delete(userId)).subscribe({
        next: (result) => {
          this.toastr.success('User removed successfully');
          this.users.items = this.users.items.filter(usr => usr.id !== userId);

        },
        error: (err) => {
          if (err.status == 401) {
            this.toastr.error('Please, do login again to continue');
            this.router.navigate([`/`]);
            return;
          }
          if (err.status == 404) {
            this.toastr.error('User not founded');
            this.router.navigate([`/users`]);
            return;
          }
          if (err.status == 200) {
            this.toastr.success('User was updated!');
            return;
          }
          this.toastr.error('Error when try to update user');
        }
      })
    }
  }

  async onPageChange(page: number) {
    await this.getProductSaleHistory(page);
  }

}
