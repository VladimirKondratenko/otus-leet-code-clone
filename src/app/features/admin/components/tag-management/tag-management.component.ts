import { Component, OnInit, DestroyRef, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Tag } from '../../../../models/tag.model';
import * as TagActions from '../../../../store/actions/tag.actions';
import * as fromTag from '../../../../store/reducers/tag.reducer';

@Component({
  selector: 'app-tag-management',
  template: `
    <div class="tag-management-container">
      <h2>Управление тегами</h2>

      <div class="add-tag-form">
        <h3>Добавить тег</h3>
        <form (ngSubmit)="onSubmit()">
          <div class="form-group">
            <label for="name">Название</label>
            <input
              type="text"
              id="name"
              [(ngModel)]="newTag['name']"
              name="name"
              required
            >
          </div>
          <div class="form-group">
            <label for="description">Описание</label>
            <textarea
              id="description"
              [(ngModel)]="newTag['description']"
              name="description"
            ></textarea>
          </div>
          <button type="submit" [disabled]="loading$ | async">
            Добавить тег
          </button>
        </form>
      </div>

      <div class="tags-list">
        <h3>Список тегов</h3>
        <div *ngIf="loading$ | async" class="loading">
          Загрузка тегов...
        </div>

        <div *ngIf="error$ | async as error" class="error">
          {{ error }}
        </div>

        <div *ngIf="!(loading$ | async) && !(error$ | async)" class="tags-grid">
          @for (tag of tags$ | async; track tag.id) {
            <div class="tag-card">
              <div class="tag-content">
                <h4>{{ tag.name }}</h4>
                <p *ngIf="tag.description">{{ tag.description }}</p>
              </div>
              <div class="tag-actions">
                <button class="edit-button" (click)="onEdit(tag)">
                  Редактировать
                </button>
                <button class="delete-button" (click)="onDelete(tag.id)">
                  Удалить
                </button>
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  `,
  styles: [`
    .tag-management-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;

      h2 {
        margin-bottom: 2rem;
        color: #333;
      }
    }

    .add-tag-form {
      background: white;
      padding: 1.5rem;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      margin-bottom: 2rem;

      h3 {
        margin-bottom: 1rem;
        color: #333;
      }

      .form-group {
        margin-bottom: 1rem;

        label {
          display: block;
          margin-bottom: 0.5rem;
          color: #666;
        }

        input, textarea {
          width: 100%;
          padding: 0.5rem;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 1rem;

          &:focus {
            outline: none;
            border-color: #007bff;
          }
        }

        textarea {
          min-height: 100px;
          resize: vertical;
        }
      }

      button {
        background: #28a745;
        color: white;
        border: none;
        padding: 0.75rem 1.5rem;
        border-radius: 4px;
        cursor: pointer;
        font-size: 1rem;
        transition: background-color 0.2s;

        &:hover {
          background: #218838;
        }

        &:disabled {
          background: #ccc;
          cursor: not-allowed;
        }
      }
    }

    .tags-list {
      h3 {
        margin-bottom: 1rem;
        color: #333;
      }
    }

    .loading, .error {
      text-align: center;
      padding: 2rem;
      font-size: 1.2rem;
    }

    .error {
      color: #dc3545;
    }

    .tags-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 1.5rem;
    }

    .tag-card {
      background: white;
      border-radius: 8px;
      padding: 1.5rem;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      display: flex;
      justify-content: space-between;
      align-items: flex-start;

      .tag-content {
        flex: 1;

        h4 {
          margin: 0 0 0.5rem;
          color: #333;
        }

        p {
          margin: 0;
          color: #666;
          font-size: 0.9rem;
        }
      }

      .tag-actions {
        display: flex;
        gap: 0.5rem;

        button {
          padding: 0.5rem 1rem;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 0.9rem;
          transition: background-color 0.2s;

          &.edit-button {
            background: #ffc107;
            color: #000;

            &:hover {
              background: #e0a800;
            }
          }

          &.delete-button {
            background: #dc3545;
            color: white;

            &:hover {
              background: #c82333;
            }
          }
        }
      }
    }
  `]
})
export class TagManagementComponent implements OnInit {
  private destroyRef = inject(DestroyRef);
  private store = inject(Store);

  tags$: Observable<Tag[]>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;
  newTag: Omit<Tag, 'id'> = {
    name: '',
    description: '',
    createdAt: new Date(),
    updatedAt: new Date()
  };

  constructor() {
    this.tags$ = this.store.select(fromTag.selectAllTags).pipe(
      takeUntilDestroyed(this.destroyRef)
    );
    this.loading$ = this.store.select(fromTag.selectTagLoading).pipe(
      takeUntilDestroyed(this.destroyRef)
    );
    this.error$ = this.store.select(fromTag.selectTagError).pipe(
      takeUntilDestroyed(this.destroyRef)
    );
  }

  ngOnInit(): void {
    this.store.dispatch(TagActions.loadTags());
  }

  onSubmit(): void {
    if (this.newTag['name'].trim()) {
      this.store.dispatch(TagActions.createTag({ tag: this.newTag }));
      this.newTag = {
        name: '',
        description: '',
        createdAt: new Date(),
        updatedAt: new Date()
      };
    }
  }

  onEdit(tag: Tag): void {
    // TODO: Реализовать редактирование тега
  }

  onDelete(id: number): void {
    if (confirm('Вы уверены, что хотите удалить этот тег?')) {
      this.store.dispatch(TagActions.deleteTag({ id }));
    }
  }
} 