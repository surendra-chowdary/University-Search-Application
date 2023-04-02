import { Component, OnInit } from '@angular/core';
import { COUNTRIES_LIST, MARK_AS_FAV_TITLE, TABLE_COL_KEYS, TABLE_HEADERS, UNMARK_AS_FAV_TITLE } from 'src/app/interfacesAndConstants/constants';
import { UniversitysApiService } from 'src/app/services/universitys-api.service';

@Component({
  selector: 'app-universities-list',
  templateUrl: './universities-list.component.html',
  styleUrls: ['./universities-list.component.scss']
})
export class UniversitiesListComponent implements OnInit {
  constructor(private _universityService: UniversitysApiService) { }
  private universitiesList: any[] = []
  private localStorageKey = 'resCache';

  theads = TABLE_HEADERS;
  columnKeys = TABLE_COL_KEYS;
  markAsFav = MARK_AS_FAV_TITLE;
  unMarkAsFav = UNMARK_AS_FAV_TITLE;
  countries = COUNTRIES_LIST;

  selectedCountry = null;
  searchStr:any = null
  current = 1;
  perPage = 10;
  totalPages!: number;
  paginatedUniversities: any[] = [];


  ngOnInit(): void {
    this.cacheApiCallRes();
  }

  cacheApiCallRes() {
    if (localStorage.getItem(this.localStorageKey)) {
      this.universitiesList = JSON.parse(localStorage.getItem(this.localStorageKey) || '');
      this.universitiesList.map(university => { university.isShow = true })
      this.populatePaginatedData();
      return;
    }
    this.getUniversitiesList();
  }

  getUniversitiesList() {
    this._universityService.getUniversities().subscribe((universitiesListRes: any) => {
      this.universitiesList = universitiesListRes;
      this.universitiesList.map(university => { university.isShow = true })
      this.updateLocalStorageValue(this.universitiesList)
      this.populatePaginatedData();

    }, (err) => {
      console.log(err);
      alert('<<--Instructions to view data on this page-->> Go to your web browser settings (Chrome) ==> Privacy & Security ==> Site settings ==> Insecure content ==> click add button of Allow, then add this url `https://universities-search.web.app`');
    })
  }

  updateLocalStorageValue(value: any) {
    localStorage.setItem(this.localStorageKey, JSON.stringify(value));
  }
  availabelePages: any = []
  populatePaginatedData() {
    const filterData = this.universitiesList.filter(e => e.isShow);
    this.totalPages = Math.ceil(filterData.length / this.perPage);
    this.availabelePages = [];
    [...Array(this.totalPages)].forEach((e, i) => {
      this.availabelePages.push(i + 1)
    })
    this.paginatedUniversities = this.paginate(this.current, this.perPage);
  }

  onSelectCountry(country: Event) {
    this.universitiesList.map(e => {
      if (e.country === country) {
        e.isShow = true
      } else {
        e.isShow = false
      }
    });
    this.updateLocalStorageValue(this.universitiesList)
    this.populatePaginatedData();
  }
  onClickFavIcon(col: any) {
    col.isFav = !col.isFav;
    this.updateLocalStorageValue(this.universitiesList)
  }
  onSelectcurrent(val: any) {
    this.current = val;
    this.populatePaginatedData();
  }
  onSelectPerPage(val: any) {
    this.perPage = val;
    this.populatePaginatedData();

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
    const filterData = this.universitiesList.filter(e => e.isShow);
    return [...filterData.slice((current - 1) * perPage).slice(0, perPage)];;
  }
}
