import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatChipInputEvent } from '@angular/material/chips';

@Component({
  selector: 'app-problem-form',
  templateUrl: './problem-form.component.html',
  styleUrls: ['./problem-form.component.scss']
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