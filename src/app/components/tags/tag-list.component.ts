import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

interface Tag {
  id: number;
  name: string;
  description: string;
}

@Component({
  selector: 'app-tag-list',
  templateUrl: './tag-list.component.html',
  styleUrls: ['./tag-list.component.scss']
})
export class TagListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'description', 'actions'];
  dataSource = new MatTableDataSource<Tag>();

  constructor(private dialog: MatDialog) {}

  ngOnInit() {
    this.loadTags();
  }

  loadTags() {
    // TODO: Реализовать загрузку тегов с сервера
  }

  openAddTagDialog() {
    // TODO: Реализовать открытие диалога добавления тега
  }

  editTag(tag: Tag) {
    // TODO: Реализовать редактирование тега
  }

  deleteTag(tag: Tag) {
    // TODO: Реализовать удаление тега
  }
} 