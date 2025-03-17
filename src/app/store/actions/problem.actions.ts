import { createAction, props } from '@ngrx/store';
import { Problem } from '../../models/problem.model';

export const loadProblems = createAction('[Problem] Load Problems');
export const loadProblemsSuccess = createAction(
  '[Problem] Load Problems Success',
  props<{ problems: Problem[] }>()
);
export const loadProblemsFailure = createAction(
  '[Problem] Load Problems Failure',
  props<{ error: string }>()
);

export const loadProblem = createAction(
  '[Problem] Load Problem',
  props<{ id: number }>()
);
export const loadProblemSuccess = createAction(
  '[Problem] Load Problem Success',
  props<{ problem: Problem }>()
);
export const loadProblemFailure = createAction(
  '[Problem] Load Problem Failure',
  props<{ error: string }>()
);

export const createProblem = createAction(
  '[Problem] Create Problem',
  props<{ problem: Omit<Problem, 'id'> }>()
);
export const createProblemSuccess = createAction(
  '[Problem] Create Problem Success',
  props<{ problem: Problem }>()
);
export const createProblemFailure = createAction(
  '[Problem] Create Problem Failure',
  props<{ error: string }>()
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
  props<{ error: string }>()
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
  props<{ error: string }>()
); 