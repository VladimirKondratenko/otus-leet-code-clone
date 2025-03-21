import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Problem } from '../../models/problem.model';
import { User } from '../../models/user.model';
import * as ProblemActions from '../../stores/problems/problem.actions';
import * as ProblemSelectors from '../../stores/problems/problem.selectors';
import * as AuthSelectors from '../../stores/auth/auth.selectors';

@Component({
  selector: 'app-problems',
  templateUrl: './problems.component.html',
  styleUrls: ['./problems.component.scss']
})
export class ProblemsComponent implements OnInit {
  problems$: Observable<Problem[]>;
  loading$: Observable<boolean>;
  error$: Observable<any>;
  currentUser$: Observable<User | null>;
  isAdmin$: Observable<boolean>;

  constructor(private store: Store) {
    this.problems$ = this.store.select(ProblemSelectors.selectAllProblems);
    this.loading$ = this.store.select(ProblemSelectors.selectProblemLoading);
    this.error$ = this.store.select(ProblemSelectors.selectProblemError);
    this.currentUser$ = this.store.select(AuthSelectors.selectCurrentUser);
    this.isAdmin$ = this.store.select(AuthSelectors.selectIsAdmin);
  }

  ngOnInit(): void {
    this.store.dispatch(ProblemActions.loadProblems());
  }

  onAddProblem(): void {
    // TODO: Implement add problem dialog
  }

  onEditProblem(problem: Problem): void {
    // TODO: Implement edit problem dialog
  }

  onDeleteProblem(id: number): void {
    if (confirm('Вы уверены, что хотите удалить эту задачу?')) {
      this.store.dispatch(ProblemActions.deleteProblem({ id }));
    }
  }

  getDifficultyClass(difficulty: string): string {
    switch (difficulty.toLowerCase()) {
      case 'easy':
        return 'bg-success';
      case 'medium':
        return 'bg-warning';
      case 'hard':
        return 'bg-danger';
      default:
        return 'bg-secondary';
    }
  }
} 