import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Problem } from '../../../../models/problem.model';
import * as ProblemActions from '../../../../store/actions/problem.actions';
import * as fromProblem from '../../../../store/reducers/problem.reducer';

@Component({
  selector: 'app-problem-detail',
  template: `
    <div class="problem-detail-container">
      <div *ngIf="loading$ | async" class="loading">
        Загрузка задачи...
      </div>

      <div *ngIf="error$ | async as error" class="error">
        {{ error }}
      </div>

      <div *ngIf="problem$ | async as problem" class="problem-content">
        <div class="problem-header">
          <h1>{{ problem.title }}</h1>
          <p class="difficulty" [ngClass]="problem.difficulty.toLowerCase()">
            {{ problem.difficulty }}
          </p>
        </div>

        <div class="tags">
          <span *ngFor="let tag of problem.tags" class="tag">
            {{ tag.name }}
          </span>
        </div>

        <div class="description">
          <h2>Описание</h2>
          <p>{{ problem.description }}</p>
        </div>

        <div class="examples">
          <h2>Примеры</h2>
          <div *ngFor="let example of problem.examples" class="example">
            <div class="example-input">
              <h3>Входные данные:</h3>
              <pre>{{ example.input }}</pre>
            </div>
            <div class="example-output">
              <h3>Выходные данные:</h3>
              <pre>{{ example.output }}</pre>
            </div>
          </div>
        </div>

        <div class="solution">
          <h2>Решение</h2>
          <div class="code-editor">
            <pre><code>{{ problem.solution }}</code></pre>
          </div>
        </div>

        <div class="actions">
          <button class="submit-button" (click)="onSubmit()">
            Отправить решение
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .problem-detail-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
    }

    .loading, .error {
      text-align: center;
      padding: 2rem;
      font-size: 1.2rem;
    }

    .error {
      color: #dc3545;
    }

    .problem-content {
      background: white;
      border-radius: 8px;
      padding: 2rem;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .problem-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;

      h1 {
        margin: 0;
        color: #333;
      }

      .difficulty {
        padding: 0.5rem 1rem;
        border-radius: 4px;
        font-size: 1rem;
        margin: 0;

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
    }

    .tags {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin-bottom: 2rem;

      .tag {
        background: #e9ecef;
        padding: 0.25rem 0.75rem;
        border-radius: 4px;
        font-size: 0.9rem;
      }
    }

    h2 {
      color: #333;
      margin: 2rem 0 1rem;
    }

    .description {
      p {
        color: #666;
        line-height: 1.6;
      }
    }

    .examples {
      .example {
        background: #f8f9fa;
        border-radius: 4px;
        padding: 1rem;
        margin-bottom: 1rem;

        h3 {
          color: #333;
          margin: 0 0 0.5rem;
          font-size: 1rem;
        }

        pre {
          background: #fff;
          padding: 1rem;
          border-radius: 4px;
          margin: 0;
          overflow-x: auto;
        }
      }
    }

    .code-editor {
      background: #1e1e1e;
      border-radius: 4px;
      padding: 1rem;
      margin-bottom: 2rem;

      pre {
        margin: 0;
        overflow-x: auto;

        code {
          color: #fff;
          font-family: 'Consolas', monospace;
        }
      }
    }

    .actions {
      display: flex;
      justify-content: flex-end;
      margin-top: 2rem;

      .submit-button {
        background: #28a745;
        color: white;
        border: none;
        padding: 0.75rem 1.5rem;
        border-radius: 4px;
        cursor: pointer;
        transition: background-color 0.2s;

        &:hover {
          background: #218838;
        }
      }
    }
  `]
})
export class ProblemDetailComponent implements OnInit {
  problem$: Observable<Problem | null>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;

  constructor(
    private route: ActivatedRoute,
    private store: Store
  ) {
    this.problem$ = this.store.select(fromProblem.selectCurrentProblem);
    this.loading$ = this.store.select(fromProblem.selectProblemLoading);
    this.error$ = this.store.select(fromProblem.selectProblemError);
  }

  ngOnInit(): void {
    const problemId = Number(this.route.snapshot.paramMap.get('id'));
    this.store.dispatch(ProblemActions.loadProblem({ id: problemId }));
  }

  onSubmit(): void {
    // TODO: Реализовать отправку решения
  }
} 