import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-tag-form',
  template: `
    <h2 mat-dialog-title>{{data ? 'Редактирование тега' : 'Новый тег'}}</h2>
    <form [formGroup]="tagForm" (ngSubmit)="onSubmit()">
      <mat-dialog-content>
        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Название</mat-label>
          <input matInput formControlName="name" required>
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Описание</mat-label>
          <textarea matInput formControlName="description" rows="3" required></textarea>
        </mat-form-field>
      </mat-dialog-content>

      <mat-dialog-actions align="end">
        <button mat-button mat-dialog-close>Отмена</button>
        <button mat-raised-button color="primary" type="submit" [disabled]="!tagForm.valid">
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
      min-width: 400px;
    }
  `]
})
export class TagFormComponent implements OnInit {
  tagForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<TagFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.tagForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  ngOnInit() {
    if (this.data) {
      this.tagForm.patchValue(this.data);
    }
  }

  onSubmit() {
    if (this.tagForm.valid) {
      this.dialogRef.close(this.tagForm.value);
    }
  }
} 