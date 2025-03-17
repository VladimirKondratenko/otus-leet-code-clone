import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="app-container">
      <header class="app-header">
        <h1>LeetCode Clone</h1>
        <nav>
          <a routerLink="/problems" routerLinkActive="active">Задачи</a>
          <a routerLink="/tags" routerLinkActive="active">Теги</a>
          <a routerLink="/users" routerLinkActive="active">Пользователи</a>
        </nav>
      </header>
      <main class="app-content">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: [`
    .app-container {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }

    .app-header {
      background: #fff;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      padding: 1rem 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;

      h1 {
        margin: 0;
        color: #333;
      }

      nav {
        display: flex;
        gap: 2rem;

        a {
          color: #666;
          text-decoration: none;
          padding: 0.5rem 1rem;
          border-radius: 4px;
          transition: all 0.2s;

          &:hover {
            background: #f5f5f5;
          }

          &.active {
            color: #007bff;
            background: #e7f1ff;
          }
        }
      }
    }

    .app-content {
      flex: 1;
      background: #f8f9fa;
    }
  `]
})
export class AppComponent {
  title = 'LeetCode Clone';
} 