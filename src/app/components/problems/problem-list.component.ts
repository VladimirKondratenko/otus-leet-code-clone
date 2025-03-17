import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

interface Problem {
  id: number;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  tags: string[];
}

@Component({
  selector: 'app-problem-list',
  template: `
    <div class="problem-list-container">
      <h2>Управление задачами</h2>
      <button mat-raised-button color="primary" (click)="openAddProblemDialog()">
        Добавить задачу
      </button>
      
      <table mat-table [dataSource]="dataSource">
        <ng-container matColumnDef="title">
          <th mat-header-cell *matHeaderCellDef>Название</th>
          <td mat-cell *matCellDef="let problem">{{problem.title}}</td>
        </ng-container>

        <ng-container matColumnDef="difficulty">
          <th mat-header-cell *matHeaderCellDef>Сложность</th>
          <td mat-cell *matCellDef="let problem">{{problem.difficulty}}</td>
        </ng-container>

        <ng-container matColumnDef="tags">
          <th mat-header-cell *matHeaderCellDef>Теги</th>
          <td mat-cell *matCellDef="let problem">
            <mat-chip-list>
              <mat-chip *ngFor="let tag of problem.tags">{{tag}}</mat-chip>
            </mat-chip-list>
          </td>
        </ng-container>

        <ng-container matColumnDef="actions">
          <th mat-header-cell *matHeaderCellDef>Действия</th>
          <td mat-cell *matCellDef="let problem">
            <button mat-icon-button color="primary" (click)="editProblem(problem)">
              <mat-icon>edit</mat-icon>
            </button>
            <button mat-icon-button color="warn" (click)="deleteProblem(problem)">
              <mat-icon>delete</mat-icon>
            </button>
          </td>
        </ng-container>

        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
      </table>
    </div>
  `,
  styles: [`
    .problem-list-container {
      padding: 20px;
    }
    table {
      width: 100%;
      margin-top: 20px;
    }
    .mat-column-actions {
      width: 120px;
      text-align: center;
    }
  `]
})
export class ProblemListComponent implements OnInit {
  displayedColumns: string[] = ['title', 'difficulty', 'tags', 'actions'];
  dataSource = new MatTableDataSource<Problem>();

  constructor(private dialog: MatDialog) {}

  ngOnInit() {
    // TODO: Загрузка данных с сервера
    this.loadProblems();
  }

  loadProblems() {
    // TODO: Реализовать загрузку задач с сервера
  }

  openAddProblemDialog() {
    // TODO: Реализовать открытие диалога добавления задачи
  }

  editProblem(problem: Problem) {
    // TODO: Реализовать редактирование задачи
  }

  deleteProblem(problem: Problem) {
    // TODO: Реализовать удаление задачи
  }
} 