import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';
import * as UserActions from '../../stores/users/user.actions';
import * as UserSelectors from '../../stores/users/user.selectors';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users$: Observable<User[]>;

  constructor(private store: Store) {
    this.users$ = this.store.select(UserSelectors.selectAllUsers);
  }

  ngOnInit(): void {
    this.store.dispatch(UserActions.loadUsers());
  }

  onAddUser(): void {
    // TODO: Implement add user dialog
  }

  onEditUser(user: User): void {
    // TODO: Implement edit user dialog
  }

  onDeleteUser(id: number): void {
    if (confirm('Вы уверены, что хотите удалить этого пользователя?')) {
      this.store.dispatch(UserActions.deleteUser({ id }));
    }
  }

  getRoleClass(role: string): string {
    switch (role.toLowerCase()) {
      case 'admin':
        return 'bg-danger';
      case 'user':
        return 'bg-primary';
      default:
        return 'bg-secondary';
    }
  }
} 