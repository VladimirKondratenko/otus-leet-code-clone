import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Problem } from '../../models/problem.model';
import * as ProblemActions from '../../store/actions/problem.actions';
import * as ProblemSelectors from '../../store/selectors/problem.selectors';

@Component({
  selector: 'app-problem-detail',
  templateUrl: './problem-detail.component.html',
  styleUrls: ['./problem-detail.component.scss']
})
export class ProblemDetailComponent implements OnInit {
  problem$: Observable<Problem | null>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;

  constructor(
    private route: ActivatedRoute,
    private store: Store
  ) {
    this.problem$ = this.store.select(ProblemSelectors.selectCurrentProblem);
    this.loading$ = this.store.select(ProblemSelectors.selectProblemLoading);
    this.error$ = this.store.select(ProblemSelectors.selectProblemError);
  }

  ngOnInit(): void {
    const problemId = Number(this.route.snapshot.paramMap.get('id'));
    this.store.dispatch(ProblemActions.loadProblem({ id: problemId }));
  }

  getDifficultyClass(difficulty: string): string {
    return difficulty.toLowerCase();
  }
} 