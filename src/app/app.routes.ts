import { Routes } from '@angular/router';
import { ProblemListComponent } from './components/problem-list/problem-list.component';
import { TagListComponent } from './components/tags/tag-list.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'problems',
    pathMatch: 'full'
  },
  {
    path: 'problems',
    component: ProblemListComponent
  },
  {
    path: 'tags',
    component: TagListComponent
  },
  {
    path: '**',
    redirectTo: 'problems'
  }
]; 