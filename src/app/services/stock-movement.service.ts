import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PaginateStockMovement } from '../interfaces/paginated';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StockMovementService {

  private token: String | null;

  constructor(
    private http: HttpClient
  ) {
    this.token = window.localStorage.getItem('token');
  }

  
    async getAll(page: number = 1) {
      return await this.http.get<PaginateStockMovement>(`${environment.apiUrl}/stock-movements?page=${page}`, {
        headers: {
          Authorization: 'Bearer ' + this.token
        }
      });
    }
}
