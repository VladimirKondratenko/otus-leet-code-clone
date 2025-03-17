import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { problemReducer } from './reducers/problem.reducer';
import { tagReducer } from './reducers/tag.reducer';
import { ProblemEffects } from './effects/problem.effects';
import { TagEffects } from './effects/tag.effects';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('problem', problemReducer),
    StoreModule.forFeature('tag', tagReducer),
    EffectsModule.forFeature([ProblemEffects, TagEffects])
  ]
})
export class ProblemModule { } 