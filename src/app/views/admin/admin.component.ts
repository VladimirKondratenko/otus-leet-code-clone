import { Component } from '@angular/core';

@Component({
  selector: 'app-admin',
  template: `
    <div class="container-fluid">
      <div class="row">
        <nav class="col-md-2 d-none d-md-block bg-light sidebar">
          <div class="position-sticky pt-3">
            <ul class="nav flex-column">
              <li class="nav-item">
                <a class="nav-link" routerLink="problems" routerLinkActive="active">
                  <i class="bi bi-code-square"></i>
                  Задачи
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" routerLink="users" routerLinkActive="active">
                  <i class="bi bi-people"></i>
                  Пользователи
                </a>
              </li>
            </ul>
          </div>
        </nav>

        <main class="col-md-10 ms-sm-auto px-md-4">
          <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 class="h2">Панель администратора</h1>
          </div>
          <router-outlet></router-outlet>
        </main>
      </div>
    </div>
  `,
  styles: [`
    .sidebar {
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      z-index: 100;
      padding: 48px 0 0;
      box-shadow: inset -1px 0 0 rgba(0, 0, 0, .1);
    }

    .sidebar .nav-link {
      font-weight: 500;
      color: #333;
      padding: .5rem 1rem;
    }

    .sidebar .nav-link.active {
      color: #2470dc;
    }

    .sidebar .nav-link:hover {
      color: #2470dc;
    }

    .sidebar .nav-link i {
      margin-right: 4px;
      color: #727272;
    }

    main {
      padding-top: 1.5rem;
    }
  `]
})
export class AdminComponent {} 