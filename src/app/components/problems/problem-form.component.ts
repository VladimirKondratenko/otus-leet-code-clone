import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatChipInputEvent } from '@angular/material/chips';

@Component({
  selector: 'app-problem-form',
  template: `
    <h2 mat-dialog-title>{{data ? 'Редактирование задачи' : 'Новая задача'}}</h2>
    <form [formGroup]="problemForm" (ngSubmit)="onSubmit()">
      <mat-dialog-content>
        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Название</mat-label>
          <input matInput formControlName="title" required>
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Описание</mat-label>
          <textarea matInput formControlName="description" rows="4" required></textarea>
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Сложность</mat-label>
          <mat-select formControlName="difficulty" required>
            <mat-option value="Easy">Легкая</mat-option>
            <mat-option value="Medium">Средняя</mat-option>
            <mat-option value="Hard">Сложная</mat-option>
          </mat-select>
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Теги</mat-label>
          <mat-chip-grid #chipGrid>
            @for (tag of tags; track $index) {
              <mat-chip-row (removed)="removeTag(tag)">
                {{tag}}
                <button matChipRemove>
                  <mat-icon>cancel</mat-icon>
                </button>
              </mat-chip-row>
            }
          </mat-chip-grid>
          <input placeholder="Новый тег..."
                 [matChipInputFor]="chipGrid"
                 (matChipInputTokenEnd)="addTag($event)">
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Пример входных данных</mat-label>
          <textarea matInput formControlName="inputExample" rows="2" required></textarea>
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Пример выходных данных</mat-label>
          <textarea matInput formControlName="outputExample" rows="2" required></textarea>
        </mat-form-field>
      </mat-dialog-content>

      <mat-dialog-actions align="end">
        <button mat-button mat-dialog-close>Отмена</button>
        <button mat-raised-button color="primary" type="submit" [disabled]="!problemForm.valid">
          {{data ? 'Сохранить' : 'Создать'}}
        </button>
      </mat-dialog-actions>
    </form>
  `,
  styles: [`
    .full-width {
      width: 100%;
      margin-bottom: 15px;
    }
    mat-dialog-content {
      min-width: 500px;
    }
  `]
})
export class ProblemFormComponent implements OnInit {
  problemForm: FormGroup;
  tags: string[] = [];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ProblemFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.problemForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      difficulty: ['', Validators.required],
      inputExample: ['', Validators.required],
      outputExample: ['', Validators.required]
    });
  }

  ngOnInit() {
    if (this.data) {
      this.problemForm.patchValue(this.data);
      this.tags = [...this.data.tags];
    }
  }

  addTag(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.tags.push(value);
      event.chipInput!.clear();
    }
  }

  removeTag(tag: string): void {
    const index = this.tags.indexOf(tag);
    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  onSubmit() {
    if (this.problemForm.valid) {
      const formData = {
        ...this.problemForm.value,
        tags: this.tags
      };
      this.dialogRef.close(formData);
    }
  }
} 