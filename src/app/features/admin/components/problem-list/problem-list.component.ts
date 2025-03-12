import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Problem } from '../../../../models/problem.model';
import { ProblemService } from '../../../../services/problem.service';

@Component({
  selector: 'app-problem-list',
  template: `
    <div class="container-fluid py-4">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h2>Управление задачами</h2>
        <button class="btn btn-primary" (click)="createProblem()">
          Создать задачу
        </button>
      </div>

      <div class="card">
        <div class="card-body">
          <div class="table-responsive">
            <table class="table table-striped">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Название</th>
                  <th>Сложность</th>
                  <th>Теги</th>
                  <th>Создано</th>
                  <th>Действия</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let problem of problems">
                  <td>{{ problem.id }}</td>
                  <td>{{ problem.title }}</td>
                  <td>
                    <span class="badge" [ngClass]="{
                      'bg-success': problem.difficulty === 'easy',
                      'bg-warning': problem.difficulty === 'medium',
                      'bg-danger': problem.difficulty === 'hard'
                    }">
                      {{ getDifficultyLabel(problem.difficulty) }}
                    </span>
                  </td>
                  <td>
                    <span *ngFor="let tag of problem.tags" class="badge bg-secondary me-1">
                      {{ tag.name }}
                    </span>
                  </td>
                  <td>{{ problem.createdAt | date }}</td>
                  <td>
                    <button class="btn btn-sm btn-outline-primary me-2" (click)="editProblem(problem.id)">
                      Редактировать
                    </button>
                    <button class="btn btn-sm btn-outline-danger" (click)="deleteProblem(problem.id)">
                      Удалить
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class ProblemListComponent implements OnInit {
  problems: Problem[] = [];

  constructor(
    private problemService: ProblemService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProblems();
  }

  loadProblems(): void {
    this.problemService.getProblems().subscribe(problems => {
      this.problems = problems;
    });
  }

  createProblem(): void {
    this.router.navigate(['/admin/problems/create']);
  }

  editProblem(id: number): void {
    this.router.navigate(['/admin/problems/edit', id]);
  }

  deleteProblem(id: number): void {
    if (confirm('Вы уверены, что хотите удалить эту задачу?')) {
      this.problemService.deleteProblem(id).subscribe(() => {
        this.problems = this.problems.filter(p => p.id !== id);
      });
    }
  }

  getDifficultyLabel(difficulty: string): string {
    const labels = {
      easy: 'Легкая',
      medium: 'Средняя',
      hard: 'Сложная'
    };
    return labels[difficulty as keyof typeof labels];
  }
} 