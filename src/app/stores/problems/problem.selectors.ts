import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Problem } from '../../models/problem.model';

export interface ProblemState {
  problems: Problem[];
  loading: boolean;
  error: any;
}

export const selectProblemState = createFeatureSelector<ProblemState>('problems');

export const selectAllProblems = createSelector(
  selectProblemState,
  (state: ProblemState) => state.problems
);

export const selectProblemLoading = createSelector(
  selectProblemState,
  (state: ProblemState) => state.loading
);

export const selectProblemError = createSelector(
  selectProblemState,
  (state: ProblemState) => state.error
); 