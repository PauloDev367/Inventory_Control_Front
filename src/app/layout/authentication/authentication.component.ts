import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../components/auth/navbar/navbar.component';

@Component({
  selector: 'app-authentication',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './authentication.component.html',
  styleUrl: './authentication.component.css'
})
export class AuthenticationComponent {

}
