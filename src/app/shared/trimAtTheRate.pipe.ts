import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'trimAtTheRate',
})
export class RemoveAfterAtPipe implements PipeTransform {
  transform(email: string): string {
    if (email && email.includes('@')) {
      return email.split('@')[0];
    }
    return email;
  }
}