import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { PaginateCategories } from '../interfaces/paginated';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private token: String | null;

  constructor(
    private http: HttpClient
  ) {
    this.token = window.localStorage.getItem('token');
  }

  async getAll(page: number = 1) {
    return await this.http.get<PaginateCategories>(`${environment.apiUrl}/categories?page=${page}`, {
      headers: {
        Authorization: 'Bearer ' + this.token
      }
    });
  }
}
