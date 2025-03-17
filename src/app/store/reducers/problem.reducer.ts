import { createReducer, on } from '@ngrx/store';
import { Problem } from '../../models/problem.model';
import * as ProblemActions from '../actions/problem.actions';

export interface ProblemState {
  problems: Problem[];
  currentProblem: Problem | null;
  loading: boolean;
  error: string | null;
}

export const initialState: ProblemState = {
  problems: [],
  currentProblem: null,
  loading: false,
  error: null
};

export const problemReducer = createReducer(
  initialState,
  on(ProblemActions.loadProblems, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(ProblemActions.loadProblemsSuccess, (state, { problems }) => ({
    ...state,
    problems,
    loading: false
  })),
  on(ProblemActions.loadProblemsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  on(ProblemActions.loadProblem, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(ProblemActions.loadProblemSuccess, (state, { problem }) => ({
    ...state,
    currentProblem: problem,
    loading: false
  })),
  on(ProblemActions.loadProblemFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  on(ProblemActions.createProblem, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(ProblemActions.createProblemSuccess, (state, { problem }) => ({
    ...state,
    problems: [...state.problems, problem],
    loading: false
  })),
  on(ProblemActions.createProblemFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  on(ProblemActions.updateProblem, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(ProblemActions.updateProblemSuccess, (state, { problem }) => ({
    ...state,
    problems: state.problems.map(p => p.id === problem.id ? problem : p),
    currentProblem: state.currentProblem?.id === problem.id ? problem : state.currentProblem,
    loading: false
  })),
  on(ProblemActions.updateProblemFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  on(ProblemActions.deleteProblem, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(ProblemActions.deleteProblemSuccess, (state, { id }) => ({
    ...state,
    problems: state.problems.filter(p => p.id !== id),
    currentProblem: state.currentProblem?.id === id ? null : state.currentProblem,
    loading: false
  })),
  on(ProblemActions.deleteProblemFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
);

// Селекторы
export const selectProblems = (state: { problem: ProblemState }) => state.problem.problems;
export const selectCurrentProblem = (state: { problem: ProblemState }) => state.problem.currentProblem;
export const selectProblemLoading = (state: { problem: ProblemState }) => state.problem.loading;
export const selectProblemError = (state: { problem: ProblemState }) => state.problem.error; 