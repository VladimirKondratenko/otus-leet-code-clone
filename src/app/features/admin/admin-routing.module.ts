import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from './components/admin-layout/admin-layout.component';
import { ProblemListComponent } from './components/problem-list/problem-list.component';
import { ProblemFormComponent } from './components/problem-form/problem-form.component';
import { TagListComponent } from './components/tag-list/tag-list.component';
import { UserListComponent } from './components/user-list/user-list.component';

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'problems',
        pathMatch: 'full'
      },
      {
        path: 'problems',
        children: [
          {
            path: '',
            component: ProblemListComponent
          },
          {
            path: 'create',
            component: ProblemFormComponent
          },
          {
            path: 'edit/:id',
            component: ProblemFormComponent
          }
        ]
      },
      {
        path: 'tags',
        component: TagListComponent
      },
      {
        path: 'users',
        component: UserListComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { } 