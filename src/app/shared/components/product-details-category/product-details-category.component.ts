import { Component, Input, OnInit } from '@angular/core';
import { ProductsService } from '../../../services/products.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Category } from '../../../interfaces/models';
import { NgFor, NgIf } from '@angular/common';
import { CategoriesService } from '../../../services/categories.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-details-category',
  standalone: true,
  imports: [NgIf, NgFor, FormsModule],
  templateUrl: './product-details-category.component.html',
  styleUrl: './product-details-category.component.css'
})
export class ProductDetailsCategoryComponent implements OnInit {
  @Input() productId: string = '';
  public categories: Array<Category> = [];
  public searchQuery: string = '';
  public filteredCategories: Category[] = [];
  public selectedCategories: Category[] = [];

  constructor(
    private service: ProductsService,
    private categoryService: CategoriesService,
    private toastr: ToastrService,
    private router: Router
  ) { }
  async ngOnInit() {
    await this.getProductCategories();
  }

  async onSearchCategory() {
    if (this.searchQuery.length < 2) {
      this.filteredCategories = [];
      return;
    }

    (await this.categoryService.getAll(1, this.searchQuery)).subscribe({
      next: (response) => {
        const selectedIds = this.selectedCategories.map(c => c.id);
        this.filteredCategories = response.items.filter(
          cat => !selectedIds.includes(cat.id)
        );
      },
      error: () => {
        this.filteredCategories = [];
      }
    });
  }
  addToSelected(category: Category) {
    if (!this.selectedCategories.find(c => c.id === category.id)) {
      this.selectedCategories.push(category);
      this.searchQuery = '';
      this.filteredCategories = [];
    }
  }

  removeFromSelected(category: Category) {
    this.selectedCategories = this.selectedCategories.filter(
      (cat) => cat.id !== category.id
    );
  }

  async removeCategory(category: Category) {
    const confirm = window.confirm('Do you really want to remove this category?');
    if (confirm) {
      (await this.categoryService.removeProductCategory(category.id, this.productId)).subscribe({
        next: (result) => {
          alert('Categories removed');
          window.location.reload();
        },
        error: (err) => {
          if (err.status == 401) {
            this.toastr.error('Please, do login again to continue');
            this.router.navigate(['/']);
            return;
          }
          this.toastr.error('Error when try to remove category');
        }
      });
      return;
    }
  }

  async addCategoriesToProduct() {
    if (this.selectedCategories.length > 0) {
      const ids = this.selectedCategories.map(ct => ct.id);
      (await this.categoryService.addCategoriesToProduct(ids, this.productId)).subscribe({
        next: (result) => {
          alert('Categories added');
          window.location.reload();
        },
        error: (err) => {
          if (err.status == 401) {
            this.toastr.error('Please, do login again to continue');
            this.router.navigate(['/']);
            return;
          }
          this.toastr.error('Error when try to add category');
        }
      });
      return;
    }

    alert('Please, select some category to continue');
  }

  async getProductCategories() {
    (await this.service.getProductCategories(this.productId)).subscribe({
      next: (result) => {
        this.categories = result;
      },
      error: (err) => {
        if (err.status == 401) {
          this.toastr.error('Please, do login again to continue');
          this.router.navigate(['/']);
          return;
        }
        this.toastr.error('Error when try to get product categories');
      }
    });
  }
}
