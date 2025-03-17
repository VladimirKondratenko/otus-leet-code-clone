import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { ProblemManagementComponent } from './components/problem-management/problem-management.component';
import { TagManagementComponent } from './components/tag-management/tag-management.component';
import { UserManagementComponent } from './components/user-management/user-management.component';
import { SharedModule } from '../../shared/shared.module';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: AdminDashboardComponent },
  { path: 'problems', component: ProblemManagementComponent },
  { path: 'tags', component: TagManagementComponent },
  { path: 'users', component: UserManagementComponent }
];

@NgModule({
  declarations: [
    AdminDashboardComponent,
    ProblemManagementComponent,
    TagManagementComponent,
    UserManagementComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class AdminModule { } 