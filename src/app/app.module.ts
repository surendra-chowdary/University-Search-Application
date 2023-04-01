import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UniversitiesListComponent } from './components/universities-list/universities-list.component';
import { HttpClientModule } from '@angular/common/http';
import { CustomPaginationComponent } from './components/custom-pagination/custom-pagination.component';
import { SearchPipe } from './pipes/search.pipe'
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
    UniversitiesListComponent,
    CustomPaginationComponent,
    SearchPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
