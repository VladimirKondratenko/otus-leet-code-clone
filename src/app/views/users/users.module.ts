import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgRxModule } from '../../stores/ngrx.module';

const routes: Routes = [
  {
    path: '',
    component: UsersComponent
  }
];

@NgModule({
  declarations: [UsersComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgRxModule,
    RouterModule.forChild(routes)
  ]
})
export class UsersModule { } 