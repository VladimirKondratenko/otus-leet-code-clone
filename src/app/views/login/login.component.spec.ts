import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginComponent } from './login.component';
import { AuthService } from '../../services/auth.service';
import { of, throwError } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['login', 'isAuthenticated']);
    authServiceSpy.isAuthenticated.and.returnValue(false);

    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        ReactiveFormsModule,
        RouterTestingModule
      ],
      providers: [
        { provide: AuthService, useValue: authServiceSpy }
      ]
    }).compileComponents();

    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with empty form', () => {
    expect(component.loginForm.get('username')?.value).toBe('');
    expect(component.loginForm.get('password')?.value).toBe('');
  });

  it('should validate required fields', () => {
    component.submitted = true;
    fixture.detectChanges();

    expect(component.loginForm.valid).toBeFalsy();
    expect(component.f['username'].errors?.['required']).toBeTruthy();
    expect(component.f['password'].errors?.['required']).toBeTruthy();
  });

  it('should call authService.login on valid form submission', () => {
    const mockUser = { id: 1, username: 'test', email: 'test@test.com', role: 'user' as const };
    authService.login.and.returnValue(of(mockUser));

    component.loginForm.setValue({
      username: 'test',
      password: 'password'
    });

    component.onSubmit();
    expect(authService.login).toHaveBeenCalledWith('test', 'password');
  });

  it('should handle login error', () => {
    const consoleSpy = spyOn(console, 'error');
    authService.login.and.returnValue(throwError(() => new Error('Login failed')));

    component.loginForm.setValue({
      username: 'test',
      password: 'password'
    });

    component.onSubmit();
    expect(consoleSpy).toHaveBeenCalledWith('Ошибка входа:', jasmine.any(Error));
  });
}); 