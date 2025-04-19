import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { CreateProduct } from '../interfaces/createinterfaces';
import { Product } from '../interfaces/models';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private token: String | null;

  constructor(
    private http: HttpClient
  ) {
    this.token = window.localStorage.getItem('token');
  }

  async getAll(page: number = 1) {
    return await this.http.get(`${environment.apiUrl}/products?page=${page}`, {
      headers: {
        Authorization: 'Bearer ' + this.token
      }
    });
  }

  async create(product: CreateProduct) {
    return await this.http.post<Product>(`${environment.apiUrl}/products`, product, {
      headers: {
        Authorization: 'Bearer ' + this.token
      }
    });
  }

  async getOne(id: String) {
    return await this.http.get<Product>(`${environment.apiUrl}/products/${id}`, {
      headers: {
        Authorization: 'Bearer ' + this.token
      }
    });
  }
}
