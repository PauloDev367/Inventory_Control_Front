import { Injectable } from '@angular/core';
import { UserLogin } from '../../interfaces/UserLogin';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(
    private http: HttpClient
  ) { }

  async login(user: UserLogin) {
    return this.http.post(`${environment.apiUrl}/login`, user);
  }

  async logout() {
    window.localStorage.removeItem('token');
  }
}
