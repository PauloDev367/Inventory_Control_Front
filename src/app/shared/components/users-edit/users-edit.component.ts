import { Component, Input, input } from '@angular/core';
import { UpdateUser } from '../../../interfaces/models';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { UsersService } from '../../../services/users.service';


@Component({
  selector: 'app-users-edit',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './users-edit.component.html',
  styleUrl: './users-edit.component.css'
})
export class UsersEditComponent {
  @Input() public user: UpdateUser = {
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
    (await this.service.update(this.user)).subscribe({
      next: (result) => {
        this.toastr.success('User was updated!');
      },
      error: (err: HttpErrorResponse) => {
        if (err.status == 401) {
          this.toastr.error('Please, do login again to continue');
          this.router.navigate(['/']);
          return;
        }
        if(err.status == 200){
          this.toastr.success('User was updated!');
          return;
        }
        this.toastr.error('Error when try to update user');
      }
    });
  }
}
