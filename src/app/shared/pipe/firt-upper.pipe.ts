import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'firtUpper',
  standalone: true,
})
export class FirtUpperPipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): unknown {
    return value.toLowerCase().replace(/\b[a-z]/g, (c) => c.toUpperCase());
  }
}
