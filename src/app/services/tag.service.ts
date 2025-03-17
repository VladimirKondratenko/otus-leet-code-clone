import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

export interface Tag {
  id: number;
  name: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class TagService {
  private endpoint = 'tags';

  constructor(private apiService: ApiService) {}

  getTags(): Observable<Tag[]> {
    return this.apiService.get<Tag[]>(this.endpoint);
  }

  getTag(id: number): Observable<Tag> {
    return this.apiService.get<Tag>(`${this.endpoint}/${id}`);
  }

  createTag(tag: Omit<Tag, 'id'>): Observable<Tag> {
    return this.apiService.post<Tag>(this.endpoint, tag);
  }

  updateTag(id: number, tag: Partial<Tag>): Observable<Tag> {
    return this.apiService.put<Tag>(`${this.endpoint}/${id}`, tag);
  }

  deleteTag(id: number): Observable<void> {
    return this.apiService.delete<void>(`${this.endpoint}/${id}`);
  }
} 