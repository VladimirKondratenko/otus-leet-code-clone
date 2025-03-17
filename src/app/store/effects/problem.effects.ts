import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { ProblemService } from '../../services/problem.service';
import * as ProblemActions from '../actions/problem.actions';

@Injectable()
export class ProblemEffects {
  loadProblems$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProblemActions.loadProblems),
      mergeMap(() =>
        this.problemService.getProblems().pipe(
          map(problems => ProblemActions.loadProblemsSuccess({ problems })),
          catchError(error => of(ProblemActions.loadProblemsFailure({ error: error.message })))
        )
      )
    )
  );

  loadProblem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProblemActions.loadProblem),
      mergeMap(({ id }) =>
        this.problemService.getProblem(id).pipe(
          map(problem => ProblemActions.loadProblemSuccess({ problem })),
          catchError(error => of(ProblemActions.loadProblemFailure({ error: error.message })))
        )
      )
    )
  );

  createProblem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProblemActions.createProblem),
      mergeMap(({ problem }) =>
        this.problemService.createProblem(problem).pipe(
          map(newProblem => ProblemActions.createProblemSuccess({ problem: newProblem })),
          catchError(error => of(ProblemActions.createProblemFailure({ error: error.message })))
        )
      )
    )
  );

  updateProblem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProblemActions.updateProblem),
      mergeMap(({ problem }) =>
        this.problemService.updateProblem(problem.id, problem).pipe(
          map(updatedProblem => ProblemActions.updateProblemSuccess({ problem: updatedProblem })),
          catchError(error => of(ProblemActions.updateProblemFailure({ error: error.message })))
        )
      )
    )
  );

  deleteProblem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProblemActions.deleteProblem),
      mergeMap(({ id }) =>
        this.problemService.deleteProblem(id).pipe(
          map(() => ProblemActions.deleteProblemSuccess({ id })),
          catchError(error => of(ProblemActions.deleteProblemFailure({ error: error.message })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private problemService: ProblemService
  ) {}
} 