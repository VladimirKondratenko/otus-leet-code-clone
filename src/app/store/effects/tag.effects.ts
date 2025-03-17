import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { TagService } from '../../services/tag.service';
import * as TagActions from '../actions/tag.actions';

@Injectable()
export class TagEffects {
  loadTags$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TagActions.loadTags),
      mergeMap(() =>
        this.tagService.getTags().pipe(
          map(tags => TagActions.loadTagsSuccess({ tags })),
          catchError(error => of(TagActions.loadTagsFailure({ error: error.message })))
        )
      )
    )
  );

  loadTag$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TagActions.loadTag),
      mergeMap(({ id }) =>
        this.tagService.getTag(id).pipe(
          map(tag => TagActions.loadTagSuccess({ tag })),
          catchError(error => of(TagActions.loadTagFailure({ error: error.message })))
        )
      )
    )
  );

  createTag$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TagActions.createTag),
      mergeMap(({ tag }) =>
        this.tagService.createTag(tag).pipe(
          map(newTag => TagActions.createTagSuccess({ tag: newTag })),
          catchError(error => of(TagActions.createTagFailure({ error: error.message })))
        )
      )
    )
  );

  updateTag$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TagActions.updateTag),
      mergeMap(({ tag }) =>
        this.tagService.updateTag(tag.id, tag).pipe(
          map(updatedTag => TagActions.updateTagSuccess({ tag: updatedTag })),
          catchError(error => of(TagActions.updateTagFailure({ error: error.message })))
        )
      )
    )
  );

  deleteTag$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TagActions.deleteTag),
      mergeMap(({ id }) =>
        this.tagService.deleteTag(id).pipe(
          map(() => TagActions.deleteTagSuccess({ id })),
          catchError(error => of(TagActions.deleteTagFailure({ error: error.message })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private tagService: TagService
  ) {}
} 