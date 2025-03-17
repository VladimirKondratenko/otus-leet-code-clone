import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

interface Tag {
  id: number;
  name: string;
  description: string;
}

@Component({
  selector: 'app-tag-list',
  template: `
    <div class="tag-list-container">
      <h2>Управление тегами</h2>
      <button mat-raised-button color="primary" (click)="openAddTagDialog()">
        Добавить тег
      </button>
      
      <table mat-table [dataSource]="dataSource">
        <ng-container matColumnDef="name">
          <th mat-header-cell *matHeaderCellDef>Название</th>
          <td mat-cell *matCellDef="let tag">{{tag.name}}</td>
        </ng-container>

        <ng-container matColumnDef="description">
          <th mat-header-cell *matHeaderCellDef>Описание</th>
          <td mat-cell *matCellDef="let tag">{{tag.description}}</td>
        </ng-container>

        <ng-container matColumnDef="actions">
          <th mat-header-cell *matHeaderCellDef>Действия</th>
          <td mat-cell *matCellDef="let tag">
            <button mat-icon-button color="primary" (click)="editTag(tag)">
              <mat-icon>edit</mat-icon>
            </button>
            <button mat-icon-button color="warn" (click)="deleteTag(tag)">
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
    .tag-list-container {
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
export class TagListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'description', 'actions'];
  dataSource = new MatTableDataSource<Tag>();

  constructor(private dialog: MatDialog) {}

  ngOnInit() {
    this.loadTags();
  }

  loadTags() {
    // TODO: Реализовать загрузку тегов с сервера
  }

  openAddTagDialog() {
    // TODO: Реализовать открытие диалога добавления тега
  }

  editTag(tag: Tag) {
    // TODO: Реализовать редактирование тега
  }

  deleteTag(tag: Tag) {
    // TODO: Реализовать удаление тега
  }
} 