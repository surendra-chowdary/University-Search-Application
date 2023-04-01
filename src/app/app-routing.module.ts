import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UniversitiesListComponent } from './components/universities-list/universities-list.component';

const routes: Routes = [
  {
    path:'' , redirectTo: '/university-list' , pathMatch:'full'
  },
  {
    path: 'university-list', component: UniversitiesListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
