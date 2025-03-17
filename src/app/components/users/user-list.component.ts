import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

interface User {
  id: number;
  username: string;
  email: string;
  role: string;
  createdAt: Date;
}

@Component({
  selector: 'app-user-list',
  template: `
    <div class="user-list-container">
      <h2>Управление пользователями</h2>
      
      <table mat-table [dataSource]="dataSource">
        <ng-container matColumnDef="username">
          <th mat-header-cell *matHeaderCellDef>Имя пользователя</th>
          <td mat-cell *matCellDef="let user">{{user.username}}</td>
        </ng-container>

        <ng-container matColumnDef="email">
          <th mat-header-cell *matHeaderCellDef>Email</th>
          <td mat-cell *matCellDef="let user">{{user.email}}</td>
        </ng-container>

        <ng-container matColumnDef="role">
          <th mat-header-cell *matHeaderCellDef>Роль</th>
          <td mat-cell *matCellDef="let user">
            <mat-form-field appearance="outline">
              <mat-select [value]="user.role" (selectionChange)="updateUserRole(user, $event.value)">
                <mat-option value="user">Пользователь</mat-option>
                <mat-option value="admin">Администратор</mat-option>
              </mat-select>
            </mat-form-field>
          </td>
        </ng-container>

        <ng-container matColumnDef="createdAt">
          <th mat-header-cell *matHeaderCellDef>Дата регистрации</th>
          <td mat-cell *matCellDef="let user">{{user.createdAt | date:'dd.MM.yyyy'}}</td>
        </ng-container>

        <ng-container matColumnDef="actions">
          <th mat-header-cell *matHeaderCellDef>Действия</th>
          <td mat-cell *matCellDef="let user">
            <button mat-icon-button color="warn" (click)="deleteUser(user)">
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
    .user-list-container {
      padding: 20px;
    }
    table {
      width: 100%;
      margin-top: 20px;
    }
    .mat-column-actions {
      width: 80px;
      text-align: center;
    }
    .mat-column-role {
      width: 200px;
    }
  `]
})
export class UserListComponent implements OnInit {
  displayedColumns: string[] = ['username', 'email', 'role', 'createdAt', 'actions'];
  dataSource = new MatTableDataSource<User>();

  constructor(private dialog: MatDialog) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    // TODO: Реализовать загрузку пользователей с сервера
  }

  updateUserRole(user: User, newRole: string) {
    // TODO: Реализовать обновление роли пользователя
  }

  deleteUser(user: User) {
    // TODO: Реализовать удаление пользователя
  }
} 