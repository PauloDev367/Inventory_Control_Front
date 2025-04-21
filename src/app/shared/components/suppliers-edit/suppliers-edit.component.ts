import { Component, Input } from '@angular/core';
import { Supplier } from '../../../interfaces/models';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-suppliers-edit',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './suppliers-edit.component.html',
  styleUrl: './suppliers-edit.component.css'
})
export class SuppliersEditComponent {
  @Input() public supplier: Supplier = {
    createdAt: "",
    deletedAt: "",
    email: "",
    id: "",
    name: "",
    phoneNumber: "",
    products: null,
  };
  onSubmit() {

  }
}
