import { createFeatureSelector, createSelector } from '@ngrx/store';
import { User } from '../../models/user.model';

export interface AuthState {
  currentUser: User | null;
  loading: boolean;
  error: any;
}

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectCurrentUser = createSelector(
  selectAuthState,
  (state: AuthState) => state.currentUser
);

export const selectIsAdmin = createSelector(
  selectCurrentUser,
  (user: User | null) => user?.role === 'admin'
);

export const selectAuthLoading = createSelector(
  selectAuthState,
  (state: AuthState) => state.loading
);

export const selectAuthError = createSelector(
  selectAuthState,
  (state: AuthState) => state.error
); 