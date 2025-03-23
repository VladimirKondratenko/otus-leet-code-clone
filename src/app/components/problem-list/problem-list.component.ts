import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, combineLatest, map } from 'rxjs';
import { Problem } from '../../models/problem.model';
import { Tag } from '../../models/tag.model';
import * as ProblemActions from '../../store/actions/problem.actions';
import * as ProblemSelectors from '../../store/selectors/problem.selectors';
import * as TagActions from '../../store/actions/tag.actions';
import * as TagSelectors from '../../store/selectors/tag.selectors';

@Component({
  selector: 'app-problem-list',
  templateUrl: './problem-list.component.html',
  styleUrls: ['./problem-list.component.scss']
})
export class ProblemListComponent implements OnInit {
  problems$: Observable<Problem[]>;
  filteredProblems$: Observable<Problem[]>;
  tags$: Observable<Tag[]>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;
  selectedTags: number[] = [];
  newTagName: string = '';

  constructor(private store: Store) {
    this.problems$ = this.store.select(ProblemSelectors.selectAllProblems);
    this.tags$ = this.store.select(TagSelectors.selectAllTags);
    this.loading$ = this.store.select(ProblemSelectors.selectProblemLoading);
    this.error$ = this.store.select(ProblemSelectors.selectProblemError);
    
    // Создаем Observable для отфильтрованных задач
    this.filteredProblems$ = combineLatest([
      this.problems$,
      this.tags$
    ]).pipe(
      map(([problems, tags]) => {
        if (this.selectedTags.length === 0) {
          return problems;
        }
        return problems.filter(problem => 
          problem.tags.some(tag => this.selectedTags.includes(tag.id))
        );
      })
    );
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
  }

  isTagSelected(tagId: number): boolean {
    return this.selectedTags.includes(tagId);
  }

  addNewTag(): void {
    if (this.newTagName.trim()) {
      this.store.dispatch(TagActions.createTag({
        tag: {
          name: this.newTagName.trim(),
          description: ''
        }
      }));
      this.newTagName = '';
    }
  }

  addTagToProblem(problemId: number, tagId: number): void {
    this.store.dispatch(ProblemActions.addTagToProblem({ problemId, tagId }));
  }

  removeTagFromProblem(problemId: number, tagId: number): void {
    this.store.dispatch(ProblemActions.removeTagFromProblem({ problemId, tagId }));
  }

  trackByProblemId(index: number, problem: Problem): number {
    return problem.id;
  }

  trackByTagId(index: number, tag: Tag): number {
    return tag.id;
  }

  clearFilters(): void {
    this.selectedTags = [];
  }
} 