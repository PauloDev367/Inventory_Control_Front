import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Supplier } from '../interfaces/models';
import { PaginateSuppliers } from '../interfaces/paginated';

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

  async getAll(page: number = 1) {
    return await this.http.get<PaginateSuppliers>(`${environment.apiUrl}/suppliers?page${page}`, {
      headers: {
        Authorization: 'Bearer ' + this.token
      }
    });
  }

  async create(supplier: Supplier) {
    return await this.http.post<Supplier>(`${environment.apiUrl}/suppliers`, {
      name: supplier.name,
      email: supplier.email,
      phoneNumber: supplier.phoneNumber,
    }, {
      headers: {
        Authorization: 'Bearer ' + this.token
      }
    });
  }

  async update(supplier: Supplier) {
    return await this.http.put<Supplier>(`${environment.apiUrl}/suppliers/${supplier.id}`, {
      name: supplier.name,
      email: supplier.email,
      phoneNumber: supplier.phoneNumber,
    }, {
      headers: {
        Authorization: 'Bearer ' + this.token
      }
    });
  }

  async delete(supplierId: string) {
    return await this.http.delete<Supplier>(`${environment.apiUrl}/suppliers/${supplierId}`, {
      headers: {
        Authorization: 'Bearer ' + this.token
      }
    });
  }


}
