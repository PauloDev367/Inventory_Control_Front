import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { PaginateCategories } from '../interfaces/paginated';
import { Category } from '../interfaces/models';

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

  async getAll(page: number = 1, search?: string) {
    const params = new URLSearchParams();
    params.set('page', page.toString());
    if (search) {
      params.set('search', search);
    }

    return await this.http.get<PaginateCategories>(
      `${environment.apiUrl}/categories?${params.toString()}`,
      {
        headers: {
          Authorization: 'Bearer ' + this.token
        }
      }
    );
  }

  async addCategoriesToProduct(categoriesId: Array<string>, productId: string) {
    return await this.http.post<Category>(`${environment.apiUrl}/products/${productId}/categories`, {
      categoriesId: categoriesId
    }, {
      headers: {
        Authorization: 'Bearer ' + this.token
      }
    });
  }

  async removeProductCategory(categoryId: string, productId: string) {
    return await this.http.delete<Category>(`${environment.apiUrl}/products/${productId}/categories`, {
      headers: {
        Authorization: 'Bearer ' + this.token
      },
      body: {
        categoriesId: [categoryId]
      }
    });
  }

  async create(category: Category) {
    return await this.http.post<Category>(`${environment.apiUrl}/categories`, {
      name: category.name
    }, {
      headers: {
        Authorization: 'Bearer ' + this.token
      }
    });
  }

  async update(category: Category) {
    return await this.http.put<Category>(`${environment.apiUrl}/categories/${category.id}`, {
      name: category.name
    }, {
      headers: {
        Authorization: 'Bearer ' + this.token
      }
    });
  }

  async delete(categoryId: string) {
    return await this.http.delete(`${environment.apiUrl}/categories/${categoryId}`, {
      headers: {
        Authorization: 'Bearer ' + this.token
      }
    });
  }
}
