import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'brMoneyFormatter',
  standalone: true
})
export class BrMoneyFormatterPipe implements PipeTransform {

  transform(value: number): String {
    const price = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);

    return price;
  }

}
