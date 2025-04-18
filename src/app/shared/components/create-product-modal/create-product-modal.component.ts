import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-product-modal',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './create-product-modal.component.html',
  styleUrl: './create-product-modal.component.css'
})
export class CreateProductModalComponent {

  public product = {
    name: '',
    description: '',
    quantity: '',
    price: '',
    minimumStock: '',
  }
  constructor(
    private toastr: ToastrService
  ) {

  }

  onSumbmitForm() {

  }
}
