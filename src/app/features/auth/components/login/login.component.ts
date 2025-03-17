import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-login',
  template: `
    <div class="login-container">
      <div class="login-card">
        <h2>Вход в систему</h2>
        <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
          <div class="form-group">
            <label for="email">Email</label>
            <input
              type="email"
              id="email"
              formControlName="email"
              class="form-control"
              [class.is-invalid]="email?.invalid && email?.touched"
            >
            <div class="invalid-feedback" *ngIf="email?.invalid && email?.touched">
              Введите корректный email
            </div>
          </div>

          <div class="form-group">
            <label for="password">Пароль</label>
            <input
              type="password"
              id="password"
              formControlName="password"
              class="form-control"
              [class.is-invalid]="password?.invalid && password?.touched"
            >
            <div class="invalid-feedback" *ngIf="password?.invalid && password?.touched">
              Введите пароль
            </div>
          </div>

          <div class="form-group">
            <button
              type="submit"
              class="btn btn-primary"
              [disabled]="loginForm.invalid || loading"
            >
              {{ loading ? 'Вход...' : 'Войти' }}
            </button>
          </div>

          <div class="alert alert-danger" *ngIf="error">
            {{ error }}
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .login-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      background-color: #f5f5f5;
    }

    .login-card {
      background: white;
      padding: 2rem;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      width: 100%;
      max-width: 400px;
    }

    h2 {
      text-align: center;
      margin-bottom: 2rem;
      color: #333;
    }

    .form-group {
      margin-bottom: 1rem;
    }

    label {
      display: block;
      margin-bottom: 0.5rem;
      color: #666;
    }

    .form-control {
      width: 100%;
      padding: 0.5rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 1rem;

      &.is-invalid {
        border-color: #dc3545;
      }
    }

    .invalid-feedback {
      color: #dc3545;
      font-size: 0.875rem;
      margin-top: 0.25rem;
    }

    .btn {
      width: 100%;
      padding: 0.75rem;
      border: none;
      border-radius: 4px;
      font-size: 1rem;
      cursor: pointer;
      transition: background-color 0.2s;

      &.btn-primary {
        background-color: #007bff;
        color: white;

        &:hover {
          background-color: #0056b3;
        }

        &:disabled {
          background-color: #ccc;
          cursor: not-allowed;
        }
      }
    }

    .alert {
      padding: 0.75rem;
      border-radius: 4px;
      margin-top: 1rem;
      font-size: 0.875rem;

      &.alert-danger {
        background-color: #f8d7da;
        border: 1px solid #f5c6cb;
        color: #721c24;
      }
    }
  `]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/admin']);
    }
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.loading = true;
      this.error = null;

      this.authService.login(
        this.loginForm.value.email,
        this.loginForm.value.password
      ).subscribe({
        next: () => {
          this.router.navigate(['/admin']);
        },
        error: (error) => {
          this.error = 'Неверный email или пароль';
          this.loading = false;
        }
      });
    }
  }
} 