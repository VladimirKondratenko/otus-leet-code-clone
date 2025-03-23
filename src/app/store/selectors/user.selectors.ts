import { createFeatureSelector, createSelector } from '@ngrx/store';
import { User } from '../../models/user.model';
import { UserState } from '../reducers/user.reducer';

export const selectUserState = createFeatureSelector<UserState>('user');

export const selectAllUsers = createSelector(
  selectUserState,
  (state: UserState) => state.users
);

export const selectCurrentUser = createSelector(
  selectUserState,
  (state: UserState) => state.currentUser
);

export const selectUserLoading = createSelector(
  selectUserState,
  (state: UserState) => state.loading
);

export const selectUserError = createSelector(
  selectUserState,
  (state: UserState) => state.error
); 