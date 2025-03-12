import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { LoginComponent } from './login.component';
import * as AuthActions from '../../../../store/auth/auth.actions';
import { AuthState } from '../../../../store/app.state';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let store: MockStore<{ auth: AuthState }>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [
        ReactiveFormsModule,
        RouterTestingModule
      ],
      providers: [
        provideMockStore({
          initialState: {
            auth: {
              user: null,
              loading: false,
              error: null
            }
          }
        })
      ]
    })
    .compileComponents();

    store = TestBed.inject(Store) as MockStore<{ auth: AuthState }>;
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with empty form', () => {
    expect(component.loginForm.get('email')?.value).toBe('');
    expect(component.loginForm.get('password')?.value).toBe('');
  });

  it('should be invalid when empty', () => {
    expect(component.loginForm.valid).toBeFalsy();
  });

  it('should be invalid with invalid email', () => {
    const emailControl = component.loginForm.get('email');
    emailControl?.setValue('invalid-email');
    expect(emailControl?.valid).toBeFalsy();
  });

  it('should be valid with valid data', () => {
    component.loginForm.setValue({
      email: 'test@example.com',
      password: 'password123'
    });
    expect(component.loginForm.valid).toBeTruthy();
  });

  it('should dispatch login action on form submit', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    const credentials = {
      email: 'test@example.com',
      password: 'password123'
    };

    component.loginForm.setValue(credentials);
    component.onSubmit();

    expect(dispatchSpy).toHaveBeenCalledWith(
      AuthActions.login({ credentials })
    );
  });

  it('should not dispatch login action if form is invalid', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    component.onSubmit();
    expect(dispatchSpy).not.toHaveBeenCalled();
  });
}); 