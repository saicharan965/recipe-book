import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'highlight'
})
export class HighlightPipe implements PipeTransform {
    transform(text: string, search: string): string {
        if (!search || !text) {
            return text;
        }
        const pattern = new RegExp(search, 'gi');
        return text.replace(pattern, match => `<span class="p-0 bg-warning">${match}</span>`);
    }
}
