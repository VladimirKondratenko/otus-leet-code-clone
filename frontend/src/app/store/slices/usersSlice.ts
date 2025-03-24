import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { User } from '../../models/user';

interface UsersState {
  items: User[];
  loading: boolean;
  error: string | null;
}

const initialState: UsersState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async () => {
    const response = await fetch('/api/users');
    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }
    return response.json();
  }
);

export const updateUserRating = createAsyncThunk(
  'users/updateRating',
  async ({ userId, rating }: { userId: number; rating: number }) => {
    const response = await fetch(`/api/users/${userId}/rating`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ rating }),
    });
    if (!response.ok) {
      throw new Error('Failed to update user rating');
    }
    return response.json();
  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch users';
      })
      .addCase(updateUserRating.fulfilled, (state, action) => {
        const index = state.items.findIndex(user => user.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      });
  },
});

export default usersSlice.reducer; 