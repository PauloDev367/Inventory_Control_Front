import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {
  private id: String = "";

  constructor(
    private route: ActivatedRoute,
    private service: ProductsService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') ?? "";
    this.getProductData();
  }


  private async getProductData() {
    (await this.service.getOne(this.id)).subscribe({
      next: (result) => {
        console.log(result);
      },
      error: (err: HttpErrorResponse) => {
        if(err.status == 401){
          this.toastr.error('Please, do login again to continue');
          this.router.navigate(['/']);
          return;
        }
        if(err.status == 404){
          this.toastr.error('Product not founded');
          this.router.navigate(['/products']);
          return;
        }
        this.toastr.error('Error when try to get products');
      }
    })
  }
}
