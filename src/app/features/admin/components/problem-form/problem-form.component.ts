import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ProblemService } from '../../../../services/problem.service';
import { TagService } from '../../../../services/tag.service';
import { Problem, Tag, ProblemExample } from '../../../../models/problem.model';

@Component({
  selector: 'app-problem-form',
  template: `
    <div class="container-fluid py-4">
      <div class="card">
        <div class="card-header">
          <h3>{{ isEditMode ? 'Редактирование задачи' : 'Создание задачи' }}</h3>
        </div>
        <div class="card-body">
          <form [formGroup]="problemForm" (ngSubmit)="onSubmit()">
            <div class="mb-3">
              <label for="title" class="form-label">Название</label>
              <input
                type="text"
                class="form-control"
                id="title"
                formControlName="title"
                [ngClass]="{'is-invalid': submitted && f['title'].errors}"
              >
              <div *ngIf="submitted && f['title'].errors" class="invalid-feedback">
                <div *ngIf="f['title'].errors['required']">Название обязательно</div>
              </div>
            </div>

            <div class="mb-3">
              <label for="description" class="form-label">Описание</label>
              <textarea
                class="form-control"
                id="description"
                rows="5"
                formControlName="description"
                [ngClass]="{'is-invalid': submitted && f['description'].errors}"
              ></textarea>
              <div *ngIf="submitted && f['description'].errors" class="invalid-feedback">
                <div *ngIf="f['description'].errors['required']">Описание обязательно</div>
              </div>
            </div>

            <div class="mb-3">
              <label for="difficulty" class="form-label">Сложность</label>
              <select
                class="form-select"
                id="difficulty"
                formControlName="difficulty"
                [ngClass]="{'is-invalid': submitted && f['difficulty'].errors}"
              >
                <option value="">Выберите сложность</option>
                <option value="easy">Легкая</option>
                <option value="medium">Средняя</option>
                <option value="hard">Сложная</option>
              </select>
              <div *ngIf="submitted && f['difficulty'].errors" class="invalid-feedback">
                <div *ngIf="f['difficulty'].errors['required']">Сложность обязательна</div>
              </div>
            </div>

            <div class="mb-3">
              <label class="form-label">Теги</label>
              <div class="d-flex flex-wrap gap-2">
                <div *ngFor="let tag of availableTags" class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    [id]="'tag-' + tag.id"
                    [value]="tag.id"
                    [checked]="isTagSelected(tag.id)"
                    (change)="onTagChange($event, tag.id)"
                  >
                  <label class="form-check-label" [for]="'tag-' + tag.id">
                    {{ tag.name }}
                  </label>
                </div>
              </div>
            </div>

            <div class="mb-3">
              <label class="form-label">Примеры</label>
              <div formArrayName="examples">
                <div *ngFor="let example of examples.controls; let i = index" [formGroupName]="i" class="card mb-3">
                  <div class="card-body">
                    <div class="mb-3">
                      <label [for]="'input-' + i" class="form-label">Входные данные</label>
                      <textarea
                        [id]="'input-' + i"
                        class="form-control"
                        formControlName="input"
                        rows="2"
                      ></textarea>
                    </div>
                    <div class="mb-3">
                      <label [for]="'output-' + i" class="form-label">Выходные данные</label>
                      <textarea
                        [id]="'output-' + i"
                        class="form-control"
                        formControlName="output"
                        rows="2"
                      ></textarea>
                    </div>
                    <div class="mb-3">
                      <label [for]="'explanation-' + i" class="form-label">Объяснение</label>
                      <textarea
                        [id]="'explanation-' + i"
                        class="form-control"
                        formControlName="explanation"
                        rows="2"
                      ></textarea>
                    </div>
                    <button type="button" class="btn btn-danger" (click)="removeExample(i)">
                      Удалить пример
                    </button>
                  </div>
                </div>
              </div>
              <button type="button" class="btn btn-secondary" (click)="addExample()">
                Добавить пример
              </button>
            </div>

            <div class="d-flex gap-2">
              <button type="submit" class="btn btn-primary" [disabled]="loading">
                {{ loading ? 'Сохранение...' : 'Сохранить' }}
              </button>
              <button type="button" class="btn btn-secondary" (click)="cancel()">
                Отмена
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class ProblemFormComponent implements OnInit {
  problemForm: FormGroup;
  availableTags: Tag[] = [];
  loading = false;
  submitted = false;
  isEditMode = false;
  problemId?: number;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private problemService: ProblemService,
    private tagService: TagService
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    this.loadTags();
    this.problemId = Number(this.route.snapshot.paramMap.get('id'));
    this.isEditMode = !!this.problemId;

    if (this.isEditMode) {
      this.loadProblem();
    }
  }

  get f() {
    return this.problemForm.controls;
  }

  get examples() {
    return this.f['examples'] as FormArray;
  }

  private createForm(): void {
    this.problemForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      difficulty: ['', Validators.required],
      tagIds: [[]],
      examples: this.formBuilder.array([])
    });
  }

  private loadTags(): void {
    this.tagService.getTags().subscribe(tags => {
      this.availableTags = tags;
    });
  }

  private loadProblem(): void {
    if (!this.problemId) return;

    this.loading = true;
    this.problemService.getProblem(this.problemId).subscribe({
      next: (problem) => {
        this.problemForm.patchValue({
          title: problem.title,
          description: problem.description,
          difficulty: problem.difficulty,
          tagIds: problem.tags.map(t => t.id)
        });

        problem.examples.forEach(example => {
          this.examples.push(this.createExampleFormGroup(example));
        });

        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.router.navigate(['/admin/problems']);
      }
    });
  }

  addExample(): void {
    this.examples.push(this.createExampleFormGroup());
  }

  removeExample(index: number): void {
    this.examples.removeAt(index);
  }

  private createExampleFormGroup(example?: ProblemExample): FormGroup {
    return this.formBuilder.group({
      input: [example?.input || '', Validators.required],
      output: [example?.output || '', Validators.required],
      explanation: [example?.explanation || '']
    });
  }

  isTagSelected(tagId: number): boolean {
    return this.f['tagIds'].value.includes(tagId);
  }

  onTagChange(event: Event, tagId: number): void {
    const checkbox = event.target as HTMLInputElement;
    const tagIds = this.f['tagIds'].value as number[];

    if (checkbox.checked) {
      this.f['tagIds'].setValue([...tagIds, tagId]);
    } else {
      this.f['tagIds'].setValue(tagIds.filter(id => id !== tagId));
    }
  }

  cancel(): void {
    this.router.navigate(['/admin/problems']);
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.problemForm.invalid) {
      return;
    }

    this.loading = true;
    const formData = this.problemForm.value;

    if (this.isEditMode && this.problemId) {
      this.problemService.updateProblem(this.problemId, formData).subscribe({
        next: () => this.router.navigate(['/admin/problems']),
        error: () => this.loading = false
      });
    } else {
      this.problemService.createProblem(formData).subscribe({
        next: () => this.router.navigate(['/admin/problems']),
        error: () => this.loading = false
      });
    }
  }
} 