import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'textLimiter',
  standalone: true
})
export class TextLimiterPipe implements PipeTransform {

  transform(value: string, limit: number = 30): unknown {
    if (value.length <= limit) return value;
    return value.slice(0, limit) + '...';
  }

}
