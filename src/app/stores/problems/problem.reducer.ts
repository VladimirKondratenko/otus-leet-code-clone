import { createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Problem } from '../../models/problem.model';
import * as ProblemActions from './problem.actions';

export interface ProblemState extends EntityState<Problem> {
  loading: boolean;
  error: any;
}

export const adapter: EntityAdapter<Problem> = createEntityAdapter<Problem>();

export const initialState: ProblemState = adapter.getInitialState({
  loading: false,
  error: null
});

export const problemReducer = createReducer(
  initialState,
  on(ProblemActions.loadProblems, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(ProblemActions.loadProblemsSuccess, (state, { problems }) =>
    adapter.setAll(problems, { ...state, loading: false })
  ),
  on(ProblemActions.loadProblemsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  on(ProblemActions.addProblem, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(ProblemActions.addProblemSuccess, (state, { problem }) =>
    adapter.addOne(problem, { ...state, loading: false })
  ),
  on(ProblemActions.addProblemFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  on(ProblemActions.updateProblem, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(ProblemActions.updateProblemSuccess, (state, { problem }) =>
    adapter.updateOne({ id: problem.id, changes: problem }, { ...state, loading: false })
  ),
  on(ProblemActions.updateProblemFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  on(ProblemActions.deleteProblem, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(ProblemActions.deleteProblemSuccess, (state, { id }) =>
    adapter.removeOne(id, { ...state, loading: false })
  ),
  on(ProblemActions.deleteProblemFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
); 