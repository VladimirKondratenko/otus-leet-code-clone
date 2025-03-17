import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Problem } from '../../../../models/problem.model';
import { Tag } from '../../../../models/tag.model';
import * as ProblemActions from '../../../../store/actions/problem.actions';
import * as TagActions from '../../../../store/actions/tag.actions';
import * as fromProblem from '../../../../store/reducers/problem.reducer';
import * as fromTag from '../../../../store/reducers/tag.reducer';

@Component({
  selector: 'app-problem-list',
  template: `
    <div class="problem-list-container">
      <div class="filters">
        <h3>Теги</h3>
        <div class="tags">
          <button
            *ngFor="let tag of tags$ | async"
            class="tag-button"
            [class.selected]="isTagSelected(tag.id)"
            (click)="onTagSelect(tag.id)"
          >
            {{ tag.name }}
          </button>
        </div>
      </div>

      <div class="problems">
        <div *ngIf="loading$ | async" class="loading">
          Загрузка задач...
        </div>

        <div *ngIf="error$ | async as error" class="error">
          {{ error }}
        </div>

        <div *ngIf="!(loading$ | async) && !(error$ | async)" class="problems-grid">
          <div *ngFor="let problem of problems$ | async" class="problem-card">
            <h3>{{ problem.title }}</h3>
            <p class="difficulty" [ngClass]="problem.difficulty.toLowerCase()">
              {{ problem.difficulty }}
            </p>
            <div class="tags">
              <span *ngFor="let tag of problem.tags" class="tag">
                {{ tag.name }}
              </span>
            </div>
            <p class="description">{{ problem.description }}</p>
            <div class="actions">
              <button class="solve-button" [routerLink]="['/problems', problem.id]">
                Решить
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .problem-list-container {
      display: flex;
      gap: 2rem;
      padding: 2rem;
      max-width: 1200px;
      margin: 0 auto;
    }

    .filters {
      width: 250px;
      padding: 1rem;
      background: #f5f5f5;
      border-radius: 8px;
      height: fit-content;

      h3 {
        margin-bottom: 1rem;
        color: #333;
      }
    }

    .tags {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;

      .tag-button {
        padding: 0.5rem 1rem;
        border: 1px solid #ddd;
        border-radius: 4px;
        background: white;
        cursor: pointer;
        transition: all 0.2s;

        &:hover {
          background: #f0f0f0;
        }

        &.selected {
          background: #007bff;
          color: white;
          border-color: #0056b3;
        }
      }
    }

    .problems {
      flex: 1;
    }

    .loading, .error {
      text-align: center;
      padding: 2rem;
      font-size: 1.2rem;
    }

    .error {
      color: #dc3545;
    }

    .problems-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 1.5rem;
    }

    .problem-card {
      background: white;
      border-radius: 8px;
      padding: 1.5rem;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      transition: transform 0.2s;

      &:hover {
        transform: translateY(-2px);
      }

      h3 {
        margin: 0 0 1rem;
        color: #333;
      }

      .difficulty {
        display: inline-block;
        padding: 0.25rem 0.75rem;
        border-radius: 4px;
        font-size: 0.9rem;
        margin-bottom: 1rem;

        &.easy {
          background: #28a745;
          color: white;
        }

        &.medium {
          background: #ffc107;
          color: #000;
        }

        &.hard {
          background: #dc3545;
          color: white;
        }
      }

      .tags {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        margin-bottom: 1rem;

        .tag {
          background: #e9ecef;
          padding: 0.25rem 0.75rem;
          border-radius: 4px;
          font-size: 0.9rem;
        }
      }

      .description {
        color: #666;
        margin-bottom: 1.5rem;
        line-height: 1.5;
      }

      .actions {
        display: flex;
        gap: 1rem;

        button {
          flex: 1;
          padding: 0.5rem;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          transition: background-color 0.2s;

          &.solve-button {
            background: #28a745;
            color: white;

            &:hover {
              background: #218838;
            }
          }
        }
      }
    }
  `]
})
export class ProblemListComponent implements OnInit {
  problems$: Observable<Problem[]>;
  tags$: Observable<Tag[]>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;
  selectedTags: number[] = [];

  constructor(private store: Store) {
    this.problems$ = this.store.select(fromProblem.selectAllProblems);
    this.tags$ = this.store.select(fromTag.selectAllTags);
    this.loading$ = this.store.select(fromProblem.selectProblemLoading);
    this.error$ = this.store.select(fromProblem.selectProblemError);
  }

  ngOnInit(): void {
    this.store.dispatch(ProblemActions.loadProblems());
    this.store.dispatch(TagActions.loadTags());
  }

  onTagSelect(tagId: number): void {
    const index = this.selectedTags.indexOf(tagId);
    if (index === -1) {
      this.selectedTags.push(tagId);
    } else {
      this.selectedTags.splice(index, 1);
    }
    // TODO: Фильтрация задач по выбранным тегам
  }

  isTagSelected(tagId: number): boolean {
    return this.selectedTags.includes(tagId);
  }
} 