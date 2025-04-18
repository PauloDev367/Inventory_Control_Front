import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../account/shared/account.service';
import { Router } from '@angular/router';
import { UserLogin } from '../../interfaces/UserLogin';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-loginform',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './loginform.component.html',
  styleUrl: './loginform.component.css'
})
export class LoginformComponent {
  constructor(
    private accountService: AccountService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  public login: UserLogin = {
    email: '',
    password: ''
  };

  async onSubmit() {
    try {
      (await this.accountService.login(this.login)).subscribe({
        next: (result: any) => {
          if(result?.success){
            const token = result.success.token;
            window.localStorage.setItem('token', token);
            this.router.navigate(['dashboard']);
            return;
          }
          this.toastr.error('E-mail ou senha inválidos!');
          this.login.email = "";
          this.login.password = "";
        },
        error: (err) => {
          this.toastr.error('E-mail ou senha inválidos!');
          this.login.email = "";
          this.login.password = "";
        }
      })
    } catch (error) {
      this.toastr.error('E-mail ou senha inválidos!');
      this.login.email = "";
      this.login.password = "";
    }
  }
}
