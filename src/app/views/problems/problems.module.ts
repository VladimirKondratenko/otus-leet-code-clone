import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProblemsComponent } from './problems.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgRxModule } from '../../stores/ngrx.module';

const routes: Routes = [
  {
    path: '',
    component: ProblemsComponent
  }
];

@NgModule({
  declarations: [ProblemsComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgRxModule,
    RouterModule.forChild(routes)
  ]
})
export class ProblemsModule { } 