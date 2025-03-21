import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  template: `
    <div class="container mt-5">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="card">
            <div class="card-header">
              <h3 class="text-center">Вход в систему</h3>
            </div>
            <div class="card-body">
              <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
                <div class="mb-3">
                  <label for="username" class="form-label">Имя пользователя</label>
                  <input
                    type="text"
                    class="form-control"
                    id="username"
                    formControlName="username"
                    [class.is-invalid]="submitted && f['username'].errors"
                  >
                  <div class="invalid-feedback" *ngIf="submitted && f['username'].errors">
                    <div *ngIf="f['username'].errors['required']">Имя пользователя обязательно</div>
                  </div>
                </div>
                <div class="mb-3">
                  <label for="password" class="form-label">Пароль</label>
                  <input
                    type="password"
                    class="form-control"
                    id="password"
                    formControlName="password"
                    [class.is-invalid]="submitted && f['password'].errors"
                  >
                  <div class="invalid-feedback" *ngIf="submitted && f['password'].errors">
                    <div *ngIf="f['password'].errors['required']">Пароль обязателен</div>
                  </div>
                </div>
                <div class="d-grid">
                  <button type="submit" class="btn btn-primary">Войти</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/']);
    }
  }

  get f() { return this.loginForm.controls; }

  onSubmit(): void {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.authService.login(this.f['username'].value, this.f['password'].value)
      .subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
        error: error => {
          console.error('Ошибка входа:', error);
        }
      });
  }
} 