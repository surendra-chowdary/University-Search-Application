import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UniversitysApiService {

  constructor(private _http: HttpClient) { }
  url: string = `http://universities.hipolabs.com/search`

  getUniversities(): Observable<any> {
    return this._http.get<any>(this.url, { responseType: 'json' })
  }
}
