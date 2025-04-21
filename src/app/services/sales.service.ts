import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { PaginateSaleHistory } from '../interfaces/paginated';

@Injectable({
  providedIn: 'root'
})
export class SalesService {
  private token: String | null;

  constructor(
    private http: HttpClient
  ) {
    this.token = window.localStorage.getItem('token');
  }

  async getAll(page: number = 1) {
    return await this.http.get<PaginateSaleHistory>(`${environment.apiUrl}/sales?page=${page}`, {
      headers: {
        Authorization: 'Bearer ' + this.token
      }
    });
  }


}
