import { Routes } from '@angular/router';
import { ProblemListComponent } from './components/problem-list/problem-list.component';
import { TagListComponent } from './components/tags/tag-list.component';
import { UserListComponent } from './components/users/user-list.component';
import { ProblemDetailComponent } from './components/problems/problem-detail.component';
import { UserProfileComponent } from './components/users/user-profile.component';

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
    path: 'problems/:id',
    component: ProblemDetailComponent
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
    path: 'users/:id',
    component: UserProfileComponent
  },
  {
    path: '**',
    redirectTo: 'problems'
  }
]; 