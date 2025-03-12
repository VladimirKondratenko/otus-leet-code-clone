import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';
import { User, AuthResponse, LoginRequest, RegisterRequest } from '../models/user.model';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  const mockUser: User = {
    id: 1,
    email: 'test@example.com',
    username: 'testuser',
    role: 'user',
    isBlocked: false,
    solvedProblems: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  const mockAuthResponse: AuthResponse = {
    user: mockUser,
    token: 'mock-token'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('login', () => {
    it('should send login request and handle response', () => {
      const credentials: LoginRequest = {
        email: 'test@example.com',
        password: 'password123'
      };

      service.login(credentials).subscribe(response => {
        expect(response).toEqual(mockAuthResponse);
        expect(localStorage.getItem('token')).toBe(mockAuthResponse.token);
        expect(service.currentUserValue).toEqual(mockAuthResponse.user);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/auth/login`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(credentials);
      req.flush(mockAuthResponse);
    });
  });

  describe('register', () => {
    it('should send register request and handle response', () => {
      const userData: RegisterRequest = {
        email: 'test@example.com',
        username: 'testuser',
        password: 'password123'
      };

      service.register(userData).subscribe(response => {
        expect(response).toEqual(mockAuthResponse);
        expect(localStorage.getItem('token')).toBe(mockAuthResponse.token);
        expect(service.currentUserValue).toEqual(mockAuthResponse.user);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/auth/register`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(userData);
      req.flush(mockAuthResponse);
    });
  });

  describe('getCurrentUser', () => {
    it('should get current user data', () => {
      service.getCurrentUser().subscribe(user => {
        expect(user).toEqual(mockUser);
        expect(service.currentUserValue).toEqual(mockUser);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/auth/me`);
      expect(req.request.method).toBe('GET');
      req.flush(mockUser);
    });
  });

  describe('logout', () => {
    it('should clear token and user data', () => {
      localStorage.setItem('token', 'mock-token');
      service['currentUserSubject'].next(mockUser);
      service['isAuthenticatedSubject'].next(true);

      service.logout();

      expect(localStorage.getItem('token')).toBeNull();
      expect(service.currentUserValue).toBeNull();
      expect(service['isAuthenticatedSubject'].value).toBeFalse();
    });
  });
}); 