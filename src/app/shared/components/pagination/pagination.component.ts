import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagination.component.html',
})
export class PaginationComponent {
  @Input() pageNumber: number = 1;
  @Input() totalPages: number = 1;
  @Output() pageChange = new EventEmitter<number>();

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages && page !== this.pageNumber) {
      this.pageChange.emit(page);
    }
  }
}
