import { Pipe, PipeTransform } from '@angular/core';
import { TABLE_COL_KEYS } from '../interfacesAndConstants/constants';

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
