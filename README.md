# LeetCode Clone - Backend

## Описание
Этот проект представляет собой клон LeetCode

## Функционал
- Регистрация и авторизация пользователей
- Роли пользователей: **пользователь**, **администратор**, **интервьюер**
- Управление задачами (CRUD)
- Оценка задач пользователями
- Комментарии и обсуждения
- RESTful API с документацией Swagger

## Технологии
- **Node.js** (с использованием Express.js)
- **Sequelize** (ORM для работы с PostgreSQL)
- **PostgreSQL** (база данных)
- **Swagger** (документация API)
- **Jest/Supertest** (для тестирования API)

## Установка и запуск
### 1. Клонирование репозитория
```bash
git clone https://github.com/VladimirKondratenko/otus-leet-code-clone.git
cd otus-leet-code-clone
```

### 2. Установка зависимостей
```bash
npm install
```

### 3. Настройка переменных окружения
Создайте файл `.env` и добавьте:
```
DATABASE_URL=postgres://user:password@localhost:5432/leetcode_clone
JWT_SECRET=your_secret_key
PORT=3000
```

### 4. Запуск сервера
```bash
npm start
```

## API Эндпоинты
### Пользователи
- `POST /users/register` – Регистрация нового пользователя
- `POST /users/login` – Вход в систему

### Задачи
- `POST /tasks` – Создание новой задачи
- `GET /tasks` – Получение списка задач
- `GET /tasks/:id` – Получение задачи по ID
- `PUT /tasks/:id` – Обновление задачи
- `DELETE /tasks/:id` – Удаление задачи

## Документация API
После запуска сервера документация будет доступна по адресу:
```
http://localhost:3000/api-docs
```

