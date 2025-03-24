import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Problem } from '../../models/problem';

interface ProblemsState {
  items: Problem[];
  loading: boolean;
  error: string | null;
}

const initialState: ProblemsState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchProblems = createAsyncThunk(
  'problems/fetchProblems',
  async () => {
    const response = await fetch('/api/problems');
    if (!response.ok) {
      throw new Error('Failed to fetch problems');
    }
    return response.json();
  }
);

export const addProblem = createAsyncThunk(
  'problems/addProblem',
  async (problem: Omit<Problem, 'id' | 'createdAt' | 'updatedAt'>) => {
    const response = await fetch('/api/problems', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(problem),
    });
    if (!response.ok) {
      throw new Error('Failed to add problem');
    }
    return response.json();
  }
);

const problemsSlice = createSlice({
  name: 'problems',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProblems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProblems.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProblems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch problems';
      })
      .addCase(addProblem.fulfilled, (state, action) => {
        state.items.push(action.payload);
      });
  },
});

export default problemsSlice.reducer; 