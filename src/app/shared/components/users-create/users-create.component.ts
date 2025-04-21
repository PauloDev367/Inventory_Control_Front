import { Component, EventEmitter, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { UpdateUser } from '../../../interfaces/models';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsersService } from '../../../services/users.service';

declare var $: any;
@Component({
  selector: 'app-users-create',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './users-create.component.html',
  styleUrl: './users-create.component.css'
})
export class UsersCreateComponent {
  public user: UpdateUser = {
    email: "",
    id: "",
    name: "",
    password: ""
  };

  constructor(
    private readonly service: UsersService,
    private readonly toastr: ToastrService,
    private readonly router: Router
  ) {

  }
  async onSubmit() {
    (await this.service.create({
      email: this.user.email,
      id: this.user.id,
      name: this.user.name,
      password: this.user.password,
    })).subscribe({
      next: (result) => {
        this.toastr.success('User was created!');
        window.location.reload();
      },
      error: (err: HttpErrorResponse) => {
        if (err.status == 401) {
          this.toastr.error('Please, do login again to continue');
          this.router.navigate(['/']);
          return;
        }
        this.toastr.error('Error when try to create user');
      }
    });
  }
}
