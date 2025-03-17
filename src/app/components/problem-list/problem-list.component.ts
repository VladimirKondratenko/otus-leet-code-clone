import { Component, OnInit } from '@angular/core';
import { ProblemService, Problem } from '../../services/problem.service';
import { TagService, Tag } from '../../services/tag.service';

@Component({
  selector: 'app-problem-list',
  templateUrl: './problem-list.component.html',
  styleUrls: ['./problem-list.component.scss']
})
export class ProblemListComponent implements OnInit {
  problems: Problem[] = [];
  tags: Tag[] = [];
  selectedTags: number[] = [];
  loading = false;
  error: string | null = null;

  constructor(
    private problemService: ProblemService,
    private tagService: TagService
  ) {}

  ngOnInit(): void {
    this.loadProblems();
    this.loadTags();
  }

  private loadProblems(): void {
    this.loading = true;
    this.problemService.getProblems().subscribe({
      next: (problems) => {
        this.problems = problems;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Ошибка при загрузке задач';
        this.loading = false;
      }
    });
  }

  private loadTags(): void {
    this.tagService.getTags().subscribe({
      next: (tags) => {
        this.tags = tags;
      },
      error: (error) => {
        console.error('Ошибка при загрузке тегов:', error);
      }
    });
  }

  onTagSelect(tagId: number): void {
    const index = this.selectedTags.indexOf(tagId);
    if (index === -1) {
      this.selectedTags.push(tagId);
    } else {
      this.selectedTags.splice(index, 1);
    }
    // TODO: Фильтрация задач по выбранным тегам
  }

  isTagSelected(tagId: number): boolean {
    return this.selectedTags.includes(tagId);
  }
} 