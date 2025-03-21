import { createAction, props } from '@ngrx/store';
import { Problem } from '../../models/problem.model';

export const loadProblems = createAction('[Problem] Load Problems');
export const loadProblemsSuccess = createAction(
  '[Problem] Load Problems Success',
  props<{ problems: Problem[] }>()
);
export const loadProblemsFailure = createAction(
  '[Problem] Load Problems Failure',
  props<{ error: any }>()
);

export const addProblem = createAction(
  '[Problem] Add Problem',
  props<{ problem: Omit<Problem, 'id' | 'createdAt' | 'updatedAt'> }>()
);
export const addProblemSuccess = createAction(
  '[Problem] Add Problem Success',
  props<{ problem: Problem }>()
);
export const addProblemFailure = createAction(
  '[Problem] Add Problem Failure',
  props<{ error: any }>()
);

export const updateProblem = createAction(
  '[Problem] Update Problem',
  props<{ problem: Problem }>()
);
export const updateProblemSuccess = createAction(
  '[Problem] Update Problem Success',
  props<{ problem: Problem }>()
);
export const updateProblemFailure = createAction(
  '[Problem] Update Problem Failure',
  props<{ error: any }>()
);

export const deleteProblem = createAction(
  '[Problem] Delete Problem',
  props<{ id: number }>()
);
export const deleteProblemSuccess = createAction(
  '[Problem] Delete Problem Success',
  props<{ id: number }>()
);
export const deleteProblemFailure = createAction(
  '[Problem] Delete Problem Failure',
  props<{ error: any }>()
); 