import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { CreateProduct } from '../interfaces/createinterfaces';
import { Category, Product } from '../interfaces/models';
import { UpdateProduct } from '../interfaces/updateinterfaces';
import { PaginateSaleHistory } from '../interfaces/paginated';

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

  async getProductCategories(id: String) {
    return await this.http.get<Array<Category>>(`${environment.apiUrl}/products/${id}/categories`, {
      headers: {
        Authorization: 'Bearer ' + this.token
      }
    });
  }

  async updateProduct(product: UpdateProduct, id: string) {
    return await this.http.put<Product>(`${environment.apiUrl}/products/${id}`, product, {
      headers: {
        Authorization: 'Bearer ' + this.token
      }
    });
  }

  async addQuantityToProduct(productId: string, quantity: number) {
    return await this.http.patch<Product>(`${environment.apiUrl}/products/${productId}/stock-movement/add`, {
      quantity
    }, {
      headers: {
        Authorization: 'Bearer ' + this.token
      }
    });
  }
  async removeQuantityToProduct(productId: string, quantity: number, unityPrice: number | null = null, isItASale: boolean = false) {
    if (isItASale == false) {
      return await this.http.patch<Product>(`${environment.apiUrl}/products/${productId}/stock-movement/remove`, {
        quantity
      }, {
        headers: {
          Authorization: 'Bearer ' + this.token
        }
      });
    }
    return await this.http.post<Product>(`${environment.apiUrl}/sales`, {
      productId: productId,
      quantity: quantity,
      unityPrice: unityPrice
    }, {
      headers: {
        Authorization: 'Bearer ' + this.token
      }
    });
  }


  async getProductSalesHistory(id: string, page: number = 1) {
    return await this.http.get<PaginateSaleHistory>(`${environment.apiUrl}/sales/product/${id}?page=${page}`, {
      headers: {
        Authorization: 'Bearer ' + this.token
      }
    });
  }
}
