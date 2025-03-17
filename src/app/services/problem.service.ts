import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

export interface Problem {
  id: number;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  tags: string[];
  inputExample: string;
  outputExample: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProblemService {
  private endpoint = 'problems';

  constructor(private apiService: ApiService) {}

  getProblems(): Observable<Problem[]> {
    return this.apiService.get<Problem[]>(this.endpoint);
  }

  getProblem(id: number): Observable<Problem> {
    return this.apiService.get<Problem>(`${this.endpoint}/${id}`);
  }

  createProblem(problem: Omit<Problem, 'id'>): Observable<Problem> {
    return this.apiService.post<Problem>(this.endpoint, problem);
  }

  updateProblem(id: number, problem: Partial<Problem>): Observable<Problem> {
    return this.apiService.put<Problem>(`${this.endpoint}/${id}`, problem);
  }

  deleteProblem(id: number): Observable<void> {
    return this.apiService.delete<void>(`${this.endpoint}/${id}`);
  }
} 