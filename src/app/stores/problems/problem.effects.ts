import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import * as ProblemActions from './problem.actions';
import { Problem } from '../../models/problem.model';

@Injectable()
export class ProblemEffects {
  loadProblems$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProblemActions.loadProblems),
      mergeMap(() =>
        this.http.get<Problem[]>('/api/problems').pipe(
          map(problems => ProblemActions.loadProblemsSuccess({ problems })),
          catchError(error => of(ProblemActions.loadProblemsFailure({ error })))
        )
      )
    )
  );

  addProblem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProblemActions.addProblem),
      mergeMap(({ problem }) =>
        this.http.post<Problem>('/api/problems', problem).pipe(
          map(problem => ProblemActions.addProblemSuccess({ problem })),
          catchError(error => of(ProblemActions.addProblemFailure({ error })))
        )
      )
    )
  );

  updateProblem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProblemActions.updateProblem),
      mergeMap(({ problem }) =>
        this.http.put<Problem>(`/api/problems/${problem.id}`, problem).pipe(
          map(problem => ProblemActions.updateProblemSuccess({ problem })),
          catchError(error => of(ProblemActions.updateProblemFailure({ error })))
        )
      )
    )
  );

  deleteProblem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProblemActions.deleteProblem),
      mergeMap(({ id }) =>
        this.http.delete<void>(`/api/problems/${id}`).pipe(
          map(() => ProblemActions.deleteProblemSuccess({ id })),
          catchError(error => of(ProblemActions.deleteProblemFailure({ error })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient
  ) {}
} 