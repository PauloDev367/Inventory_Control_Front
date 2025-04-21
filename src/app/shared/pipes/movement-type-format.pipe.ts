import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'movementTypeFormat',
  standalone: true
})
export class MovementTypeFormatPipe implements PipeTransform {

  transform(value: number) {
    return value == 0 ? 'In' : 'Out';
  }

}
