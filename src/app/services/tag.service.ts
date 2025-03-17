import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tag } from '../models/tag.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TagService {
  private apiUrl = `${environment.apiUrl}/tags`;

  constructor(private http: HttpClient) {}

  getTags(): Observable<Tag[]> {
    return this.http.get<Tag[]>(this.apiUrl);
  }

  getTag(id: number): Observable<Tag> {
    return this.http.get<Tag>(`${this.apiUrl}/${id}`);
  }

  createTag(tag: Omit<Tag, 'id'>): Observable<Tag> {
    return this.http.post<Tag>(this.apiUrl, tag);
  }

  updateTag(id: number, tag: Tag): Observable<Tag> {
    return this.http.put<Tag>(`${this.apiUrl}/${id}`, tag);
  }

  deleteTag(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
} 