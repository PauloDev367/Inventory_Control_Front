import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'brTimeFormat',
  standalone: true
})
export class BrTimeFormatPipe implements PipeTransform {

  transform(value: string): unknown {
    const date = new Date(value);
    if (isNaN(date.getTime())) return value.toString();

    const pad = (n: number, size = 2) => n.toString().padStart(size, '0');

    const dia = pad(date.getDate());
    const mes = pad(date.getMonth() + 1);
    const ano = date.getFullYear();
    const horas = pad(date.getHours());
    const minutos = pad(date.getMinutes());
    const segundos = pad(date.getSeconds());
    const milissegundos = pad(date.getMilliseconds(), 2);

    return `${dia}/${mes}/${ano} ${horas}:${minutos}:${segundos}:${milissegundos}`;
  }

}
