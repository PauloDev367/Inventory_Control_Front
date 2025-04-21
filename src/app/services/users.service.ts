import { Injectable } from '@angular/core';
import { UpdateUser, User } from '../interfaces/models';
import { PaginateUser } from '../interfaces/paginated';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private token: String | null;

  constructor(
    private http: HttpClient
  ) {
    this.token = window.localStorage.getItem('token');
  }

  async getAll(page: number = 1) {
    return await this.http.get<PaginateUser>(`${environment.apiUrl}/users?page${page}`, {
      headers: {
        Authorization: 'Bearer ' + this.token
      }
    });
  }


  async update(user: UpdateUser) {
    return await this.http.put(`${environment.apiUrl}/users/${user.id}`, {
      name: user.name,
      email: user.email,
      password: user.password
    }, {
      headers: {
        Authorization: 'Bearer ' + this.token
      }
    });
  }

  async delete(userId: string) {
    return await this.http.delete<User>(`${environment.apiUrl}/users/${userId}`, {
      headers: {
        Authorization: 'Bearer ' + this.token
      }
    });
  }
  async create(user: UpdateUser) {
    return await this.http.post(`${environment.apiUrl}/users`, {
      nome: user.name,
      email: user.email,
      senha: user.password,
      senhaConfirmacao: user.password,
    }, {
      headers: {
        Authorization: 'Bearer ' + this.token
      }
    });
  }
}
