import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { problemReducer } from './problems/problem.reducer';
import { ProblemEffects } from './problems/problem.effects';

@NgModule({
  imports: [
    StoreModule.forRoot({
      problems: problemReducer
    }),
    EffectsModule.forRoot([
      ProblemEffects
    ]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: false,
      autoPause: true,
      trace: false,
      traceLimit: 75
    })
  ]
})
export class NgRxModule { } 