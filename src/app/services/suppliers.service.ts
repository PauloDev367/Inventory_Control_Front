import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Supplier } from '../interfaces/models';

@Injectable({
  providedIn: 'root'
})
export class SuppliersService {

  private token: String | null;

  constructor(
    private http: HttpClient
  ) {
    this.token = window.localStorage.getItem('token');
  }

  async getSupplierFromProduct(supplierId: String) {
    return await this.http.get<Supplier>(`${environment.apiUrl}/suppliers/${supplierId}`, {
      headers: {
        Authorization: 'Bearer ' + this.token
      }
    });
  }
}
