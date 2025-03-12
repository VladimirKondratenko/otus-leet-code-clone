import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Problem, CreateProblemRequest, UpdateProblemRequest } from '../models/problem.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProblemService {
  private apiUrl = `${environment.apiUrl}/problems`;

  constructor(private http: HttpClient) {}

  getProblems(): Observable<Problem[]> {
    return this.http.get<Problem[]>(this.apiUrl);
  }

  getProblem(id: number): Observable<Problem> {
    return this.http.get<Problem>(`${this.apiUrl}/${id}`);
  }

  createProblem(problem: CreateProblemRequest): Observable<Problem> {
    return this.http.post<Problem>(this.apiUrl, problem);
  }

  updateProblem(id: number, problem: UpdateProblemRequest): Observable<Problem> {
    return this.http.put<Problem>(`${this.apiUrl}/${id}`, problem);
  }

  deleteProblem(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
} 