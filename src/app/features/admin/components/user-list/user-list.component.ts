import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../services/user.service';
import { User } from '../../../../models/user.model';

@Component({
  selector: 'app-user-list',
  template: `
    <div class="container-fluid py-4">
      <div class="card">
        <div class="card-header">
          <h3>Управление пользователями</h3>
        </div>
        <div class="card-body">
          <div class="table-responsive">
            <table class="table table-striped">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Email</th>
                  <th>Имя пользователя</th>
                  <th>Роль</th>
                  <th>Решено задач</th>
                  <th>Статус</th>
                  <th>Действия</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let user of users">
                  <td>{{ user.id }}</td>
                  <td>{{ user.email }}</td>
                  <td>{{ user.username }}</td>
                  <td>
                    <select
                      class="form-select form-select-sm"
                      [value]="user.role"
                      (change)="changeRole(user.id, $event)"
                      [disabled]="loading || user.id === currentUserId"
                    >
                      <option value="user">Пользователь</option>
                      <option value="admin">Администратор</option>
                    </select>
                  </td>
                  <td>{{ user.solvedProblems }}</td>
                  <td>
                    <span class="badge" [ngClass]="user.isBlocked ? 'bg-danger' : 'bg-success'">
                      {{ user.isBlocked ? 'Заблокирован' : 'Активен' }}
                    </span>
                  </td>
                  <td>
                    <button
                      class="btn btn-sm"
                      [ngClass]="user.isBlocked ? 'btn-outline-success' : 'btn-outline-danger'"
                      (click)="toggleBlock(user.id, !user.isBlocked)"
                      [disabled]="loading || user.id === currentUserId"
                    >
                      {{ user.isBlocked ? 'Разблокировать' : 'Заблокировать' }}
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
export class UserListComponent implements OnInit {
  users: User[] = [];
  loading = false;
  currentUserId: number;

  constructor(private userService: UserService) {
    this.currentUserId = this.userService.getCurrentUserId();
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.loading = true;
    this.userService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }

  changeRole(userId: number, event: Event): void {
    const select = event.target as HTMLSelectElement;
    const newRole = select.value as 'user' | 'admin';

    this.loading = true;
    this.userService.updateUserRole(userId, newRole).subscribe({
      next: (updatedUser) => {
        const index = this.users.findIndex(u => u.id === userId);
        if (index !== -1) {
          this.users[index] = updatedUser;
        }
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        // Вернуть предыдущее значение в случае ошибки
        select.value = this.users.find(u => u.id === userId)?.role || 'user';
      }
    });
  }

  toggleBlock(userId: number, block: boolean): void {
    this.loading = true;
    this.userService.toggleUserBlock(userId, block).subscribe({
      next: (updatedUser) => {
        const index = this.users.findIndex(u => u.id === userId);
        if (index !== -1) {
          this.users[index] = updatedUser;
        }
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }
} 