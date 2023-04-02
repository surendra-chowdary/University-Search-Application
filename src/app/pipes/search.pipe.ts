import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'UniversitySearch'
})
export class SearchPipe implements PipeTransform {

  transform(value: any[], searchedStr: string): any {
    if (!value) return [];

    if (!searchedStr) return value;

    return value.filter((item) => {
      return JSON.stringify(item).toLowerCase().trim().includes(searchedStr.toLowerCase().trim());
    });

  }
}
