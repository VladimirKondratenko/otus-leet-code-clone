import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Tag } from '../../models/tag';

interface TagsState {
  items: Tag[];
  loading: boolean;
  error: string | null;
}

const initialState: TagsState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchTags = createAsyncThunk(
  'tags/fetchTags',
  async () => {
    const response = await fetch('/api/tags');
    if (!response.ok) {
      throw new Error('Failed to fetch tags');
    }
    return response.json();
  }
);

export const addTag = createAsyncThunk(
  'tags/addTag',
  async (tag: Omit<Tag, 'id' | 'createdAt' | 'updatedAt'>) => {
    const response = await fetch('/api/tags', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(tag),
    });
    if (!response.ok) {
      throw new Error('Failed to add tag');
    }
    return response.json();
  }
);

const tagsSlice = createSlice({
  name: 'tags',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTags.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTags.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchTags.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch tags';
      })
      .addCase(addTag.fulfilled, (state, action) => {
        state.items.push(action.payload);
      });
  },
});

export default tagsSlice.reducer; 