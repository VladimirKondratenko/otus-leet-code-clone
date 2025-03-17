import { createReducer, on } from '@ngrx/store';
import { Tag } from '../../models/tag.model';
import * as TagActions from '../actions/tag.actions';

export interface TagState {
  tags: Tag[];
  currentTag: Tag | null;
  loading: boolean;
  error: string | null;
}

export const initialState: TagState = {
  tags: [],
  currentTag: null,
  loading: false,
  error: null
};

export const tagReducer = createReducer(
  initialState,
  on(TagActions.loadTags, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(TagActions.loadTagsSuccess, (state, { tags }) => ({
    ...state,
    tags,
    loading: false
  })),
  on(TagActions.loadTagsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  on(TagActions.loadTag, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(TagActions.loadTagSuccess, (state, { tag }) => ({
    ...state,
    currentTag: tag,
    loading: false
  })),
  on(TagActions.loadTagFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  on(TagActions.createTag, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(TagActions.createTagSuccess, (state, { tag }) => ({
    ...state,
    tags: [...state.tags, tag],
    loading: false
  })),
  on(TagActions.createTagFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  on(TagActions.updateTag, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(TagActions.updateTagSuccess, (state, { tag }) => ({
    ...state,
    tags: state.tags.map(t => t.id === tag.id ? tag : t),
    currentTag: state.currentTag?.id === tag.id ? tag : state.currentTag,
    loading: false
  })),
  on(TagActions.updateTagFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  on(TagActions.deleteTag, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(TagActions.deleteTagSuccess, (state, { id }) => ({
    ...state,
    tags: state.tags.filter(t => t.id !== id),
    currentTag: state.currentTag?.id === id ? null : state.currentTag,
    loading: false
  })),
  on(TagActions.deleteTagFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
);

// Селекторы
export const selectAllTags = (state: { tag: TagState }) => state.tag.tags;
export const selectCurrentTag = (state: { tag: TagState }) => state.tag.currentTag;
export const selectTagLoading = (state: { tag: TagState }) => state.tag.loading;
export const selectTagError = (state: { tag: TagState }) => state.tag.error; 