import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'highlight',
})
export class HighlightPipe implements PipeTransform {
    transform(value: string, searchTerm: string): string {
        if (!searchTerm || !value) {
            return value;
        }
        const regex = new RegExp(searchTerm, 'gi');
        return value.replace(regex, (match) => `<mark class="bg-warning p-0">${match}</mark>`);
    }
}