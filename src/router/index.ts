import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

// Определяем интерфейс для мета-данных маршрута
interface RouteMeta {
  requiresAuth?: boolean
  title?: string
  layout?: string
}

// Расширяем типы для маршрутов с нашими мета-данными
declare module 'vue-router' {
  interface RouteMeta extends RouteMeta {}
}

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
    meta: {
      title: 'Задачи',
      layout: 'default'
    }
  },
  {
    path: '/problems',
    name: 'problems',
    component: () => import('@/views/HomeView.vue'),
    meta: {
      title: 'Все задачи',
      layout: 'default'
    }
  },
  {
    path: '/problem/:id',
    name: 'problem',
    component: () => import('@/views/ProblemView.vue'),
    props: true,
    meta: {
      requiresAuth: true,
      title: 'Задача',
      layout: 'problem'
    }
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('@/views/ProfileView.vue'),
    meta: {
      requiresAuth: true,
      title: 'Профиль',
      layout: 'default'
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/LoginView.vue'),
    meta: {
      title: 'Вход',
      layout: 'auth'
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/NotFoundView.vue'),
    meta: {
      title: '404 - Страница не найдена',
      layout: 'error'
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Глобальный guard для проверки аутентификации
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('token')

  // Обновляем заголовок страницы
  document.title = `${to.meta.title || 'LeetCode Clone'}`

  // Проверяем необходимость аутентификации
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isAuthenticated) {
      next({
        name: 'login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    // Если пользователь авторизован и пытается зайти на страницу логина,
    // перенаправляем его на главную
    if (to.name === 'login' && isAuthenticated) {
      next({ name: 'home' })
    } else {
      next()
    }
  }
})

// Глобальный guard после навигации
router.afterEach((to) => {
  // Можно добавить аналитику или другие действия после навигации
  console.log(`Navigated to: ${to.name}`)
})

export default router 