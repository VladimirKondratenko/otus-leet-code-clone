import { createReducer, on } from '@ngrx/store';
import { User } from '../../models/user.model';
import * as UserActions from './user.actions';

export interface UserState {
  users: User[];
  loading: boolean;
  error: any;
}

export const initialState: UserState = {
  users: [],
  loading: false,
  error: null
};

export const userReducer = createReducer(
  initialState,
  on(UserActions.loadUsers, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(UserActions.loadUsersSuccess, (state, { users }) => ({
    ...state,
    users,
    loading: false
  })),
  on(UserActions.loadUsersFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  })),

  on(UserActions.addUser, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(UserActions.addUserSuccess, (state, { user }) => ({
    ...state,
    users: [...state.users, user],
    loading: false
  })),
  on(UserActions.addUserFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  })),

  on(UserActions.updateUser, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(UserActions.updateUserSuccess, (state, { user }) => ({
    ...state,
    users: state.users.map(u => u.id === user.id ? user : u),
    loading: false
  })),
  on(UserActions.updateUserFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  })),

  on(UserActions.deleteUser, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(UserActions.deleteUserSuccess, (state, { id }) => ({
    ...state,
    users: state.users.filter(u => u.id !== id),
    loading: false
  })),
  on(UserActions.deleteUserFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  }))
); 