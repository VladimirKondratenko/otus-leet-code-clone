import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TagService } from '../../../../services/tag.service';
import { Tag } from '../../../../models/problem.model';

@Component({
  selector: 'app-tag-list',
  template: `
    <div class="container-fluid py-4">
      <div class="row">
        <div class="col-md-8">
          <div class="card">
            <div class="card-header">
              <h3>Управление тегами</h3>
            </div>
            <div class="card-body">
              <div class="table-responsive">
                <table class="table table-striped">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Название</th>
                      <th>Количество задач</th>
                      <th>Действия</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr *ngFor="let tag of tags">
                      <td>{{ tag.id }}</td>
                      <td>{{ tag.name }}</td>
                      <td>{{ tag.problemCount }}</td>
                      <td>
                        <button class="btn btn-sm btn-outline-primary me-2" (click)="editTag(tag)">
                          Редактировать
                        </button>
                        <button
                          class="btn btn-sm btn-outline-danger"
                          (click)="deleteTag(tag.id)"
                          [disabled]="tag.problemCount > 0"
                        >
                          Удалить
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div class="col-md-4">
          <div class="card">
            <div class="card-header">
              <h4>{{ isEditMode ? 'Редактировать тег' : 'Создать тег' }}</h4>
            </div>
            <div class="card-body">
              <form [formGroup]="tagForm" (ngSubmit)="onSubmit()">
                <div class="mb-3">
                  <label for="name" class="form-label">Название</label>
                  <input
                    type="text"
                    class="form-control"
                    id="name"
                    formControlName="name"
                    [ngClass]="{'is-invalid': submitted && f['name'].errors}"
                  >
                  <div *ngIf="submitted && f['name'].errors" class="invalid-feedback">
                    <div *ngIf="f['name'].errors['required']">Название обязательно</div>
                  </div>
                </div>

                <div class="d-grid gap-2">
                  <button type="submit" class="btn btn-primary" [disabled]="loading">
                    {{ loading ? 'Сохранение...' : (isEditMode ? 'Обновить' : 'Создать') }}
                  </button>
                  <button *ngIf="isEditMode" type="button" class="btn btn-secondary" (click)="cancelEdit()">
                    Отмена
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class TagListComponent implements OnInit {
  tags: Tag[] = [];
  tagForm: FormGroup;
  loading = false;
  submitted = false;
  isEditMode = false;
  editingTagId?: number;

  constructor(
    private formBuilder: FormBuilder,
    private tagService: TagService
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    this.loadTags();
  }

  get f() {
    return this.tagForm.controls;
  }

  private createForm(): void {
    this.tagForm = this.formBuilder.group({
      name: ['', Validators.required]
    });
  }

  private loadTags(): void {
    this.tagService.getTags().subscribe(tags => {
      this.tags = tags;
    });
  }

  editTag(tag: Tag): void {
    this.isEditMode = true;
    this.editingTagId = tag.id;
    this.tagForm.patchValue({
      name: tag.name
    });
  }

  cancelEdit(): void {
    this.isEditMode = false;
    this.editingTagId = undefined;
    this.tagForm.reset();
  }

  deleteTag(id: number): void {
    if (confirm('Вы уверены, что хотите удалить этот тег?')) {
      this.tagService.deleteTag(id).subscribe(() => {
        this.tags = this.tags.filter(t => t.id !== id);
      });
    }
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.tagForm.invalid) {
      return;
    }

    this.loading = true;
    const { name } = this.tagForm.value;

    if (this.isEditMode && this.editingTagId) {
      this.tagService.updateTag(this.editingTagId, name).subscribe({
        next: (updatedTag) => {
          const index = this.tags.findIndex(t => t.id === this.editingTagId);
          if (index !== -1) {
            this.tags[index] = updatedTag;
          }
          this.cancelEdit();
          this.loading = false;
        },
        error: () => this.loading = false
      });
    } else {
      this.tagService.createTag(name).subscribe({
        next: (newTag) => {
          this.tags.push(newTag);
          this.tagForm.reset();
          this.loading = false;
        },
        error: () => this.loading = false
      });
    }
  }
} 