import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../account/shared/account.service';
import { Router } from '@angular/router';

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
    private router: Router
  ) { }

  public login = {
    email: '',
    password: ''
  };

  async onSubmit() {
    try {
      const result = await this.accountService.login(this.login)
      console.log('Login feito');
      this.router.navigate(['dashboard']);
    } catch (error) {
      console.log('Deu problema');
    }
  }
}
