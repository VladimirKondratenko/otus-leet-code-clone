import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProblemListComponent } from './components/problem-list/problem-list.component';
import { ProblemDetailComponent } from './components/problem-detail/problem-detail.component';
import { SharedModule } from '../../shared/shared.module';

const routes: Routes = [
  { path: '', redirectTo: 'problems', pathMatch: 'full' },
  { path: 'problems', component: ProblemListComponent },
  { path: 'problems/:id', component: ProblemDetailComponent }
];

@NgModule({
  declarations: [
    ProblemListComponent,
    ProblemDetailComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class PublicModule { } 