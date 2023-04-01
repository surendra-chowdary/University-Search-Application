import { Component, OnInit } from '@angular/core';
import { COUNTRIES_LIST, MARK_AS_FAV_TITLE, TABLE_COL_KEYS, TABLE_HEADERS, UNMARK_AS_FAV_TITLE } from 'src/app/interfacesAndConstants/constants';
import { UniversitysApiService } from 'src/app/services/universitys-api.service';

@Component({
  selector: 'app-universities-list',
  templateUrl: './universities-list.component.html',
  styleUrls: ['./universities-list.component.scss']
})
export class UniversitiesListComponent implements OnInit {
  constructor(private _universityService: UniversitysApiService) {}
  private universitiesList: any[] = []
  private localStorageKey = 'resCache';

  theads = TABLE_HEADERS;
  columnKeys = TABLE_COL_KEYS;
  markAsFav = MARK_AS_FAV_TITLE;
  unMarkAsFav = UNMARK_AS_FAV_TITLE;
  countries = COUNTRIES_LIST;

  selectedCountry: string = ''
  searchStr: string = ''
  current = 1;
  perPage = 15;
  totalPages!: number;
  paginatedUniversities: any[] = [];


  ngOnInit(): void {
    this.cacheApiCallRes();
  }


  async onSelectCountry(country:Event){
    if(this.universitiesList.findIndex((coun=>{return coun.country==country}))==-1){
     await this.cacheApiCallRes();
      this.filterByCountry(country)
      return;
    }
    this.filterByCountry(country)
  }
  filterByCountry(country:any){
    let temp = localStorage.getItem('favObj') || '{}';
    let myobj = JSON.parse(temp) || {}
    for (const key in myobj) {
      this.universitiesList.map(e=>{
        if(e.name==key){
          e.isFav= myobj[key];
        }
      })
    }
    this.universitiesList = this.universitiesList.filter(e=>{
      return e.country == country;
    });

     this.populatePaginatedData();
  }
temp:any={}
  onClickFavIcon(col: any) {
    col.isFav = !col.isFav;
    this.temp[col['name']] = col.isFav;
    localStorage.setItem('favObj', JSON.stringify(this.temp));

    // this.updateLocalStorageValue(this.universitiesList)
  }

  cacheApiCallRes() {
    if (localStorage.getItem(this.localStorageKey)) {
      let localstr = localStorage.getItem(this.localStorageKey) || '';
      this.universitiesList = JSON.parse(localstr)
      this.populatePaginatedData();
      return;
    }
    this.getUniversitiesList();
  }

  getUniversitiesList() {
    this._universityService.getUniversities().subscribe((universitiesListRes: any) => {
      this.universitiesList = universitiesListRes;
      this.updateLocalStorageValue(this.universitiesList)
      this.populatePaginatedData();
    }, (err) => {
      alert(JSON.stringify(err))
    })
  }
  updateLocalStorageValue(value: any) {
    localStorage.setItem(this.localStorageKey, JSON.stringify(value));
  }
  populatePaginatedData() {
    this.totalPages = Math.ceil(this.universitiesList.length / this.perPage);
    this.paginatedUniversities = this.paginate(this.current, this.perPage);
  }
  public onGoTo(page: number): void {
    this.current = page;
    this.paginatedUniversities = this.paginate(this.current, this.perPage);
  }

  public onNext(page: number): void {
    this.current = page + 1;
    this.paginatedUniversities = this.paginate(this.current, this.perPage);
  }

  public onPrevious(page: number): void {
    this.current = page - 1;
    this.paginatedUniversities = this.paginate(this.current, this.perPage);
  }

  public paginate(current: number, perPage: number): string[] {
    return [...this.universitiesList.slice((current - 1) * perPage).slice(0, perPage)];
  }
}
