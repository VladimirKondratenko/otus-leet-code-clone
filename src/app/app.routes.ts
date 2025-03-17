import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'problems',
    component: ProblemListComponent
  },
  {
    path: 'tags',
    component: TagListComponent
  },
  {
    path: 'users',
    component: UserListComponent
  },
  {
    path: '',
    redirectTo: 'problems',
    pathMatch: 'full'
  }
]; 