import { Component } from '@angular/core';
import { AccountService } from '../../../account/shared/account.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(
    private readonly accountService: AccountService
  ){}

  async logout(){
    await this.accountService.logout();
  }
}
