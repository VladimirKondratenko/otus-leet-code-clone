import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { ProblemsComponent } from './problems.component';
import { Problem } from '../../models/problem.model';
import * as ProblemActions from '../../stores/problems/problem.actions';

describe('ProblemsComponent', () => {
  let component: ProblemsComponent;
  let fixture: ComponentFixture<ProblemsComponent>;
  let store: jasmine.SpyObj<Store>;

  const mockProblems: Problem[] = [
    {
      id: 1,
      title: 'Test Problem 1',
      description: 'Test Description 1',
      difficulty: 'easy',
      tags: ['array', 'string'],
      examples: [
        {
          input: 'test input 1',
          output: 'test output 1',
          explanation: 'test explanation 1'
        }
      ],
      solution: 'test solution 1',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 2,
      title: 'Test Problem 2',
      description: 'Test Description 2',
      difficulty: 'medium',
      tags: ['tree', 'graph'],
      examples: [
        {
          input: 'test input 2',
          output: 'test output 2',
          explanation: 'test explanation 2'
        }
      ],
      solution: 'test solution 2',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];

  beforeEach(async () => {
    const storeSpy = jasmine.createSpyObj('Store', ['select', 'dispatch']);
    storeSpy.select.and.returnValue(of(mockProblems));

    await TestBed.configureTestingModule({
      declarations: [ProblemsComponent],
      providers: [
        { provide: Store, useValue: storeSpy }
      ]
    }).compileComponents();

    store = TestBed.inject(Store) as jasmine.SpyObj<Store>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProblemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load problems on init', () => {
    expect(store.dispatch).toHaveBeenCalledWith(ProblemActions.loadProblems());
  });

  it('should display problems in table', () => {
    const rows = fixture.nativeElement.querySelectorAll('tbody tr');
    expect(rows.length).toBe(2);
  });

  it('should call deleteProblem action when delete button is clicked', () => {
    const deleteButton = fixture.nativeElement.querySelector('button.btn-outline-danger');
    deleteButton.click();
    expect(store.dispatch).toHaveBeenCalledWith(ProblemActions.deleteProblem({ id: 1 }));
  });

  it('should return correct difficulty class', () => {
    expect(component.getDifficultyClass('easy')).toBe('bg-success');
    expect(component.getDifficultyClass('medium')).toBe('bg-warning');
    expect(component.getDifficultyClass('hard')).toBe('bg-danger');
    expect(component.getDifficultyClass('unknown')).toBe('bg-secondary');
  });
}); 