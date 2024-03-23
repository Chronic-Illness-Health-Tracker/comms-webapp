import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'name',
    standalone: true,
})
export class NamePipe implements PipeTransform {
    transform(value: unknown, ...args: unknown[]): unknown {
        return null;
    }
}
