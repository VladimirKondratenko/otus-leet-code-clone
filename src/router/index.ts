import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import ProblemView from '@/views/ProblemView.vue'
import ProfileView from '@/views/ProfileView.vue'

const isAuthenticated = (): boolean => {
  const token = localStorage.getItem('token')
  return !!token
}

const isAdmin = (): boolean => {
  const user = localStorage.getItem('user')
  if (!user) return false
  return JSON.parse(user).role === 'admin'
}

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      title: 'Главная'
    }
  },
  {
    path: '/problem/:id',
    name: 'problem',
    component: ProblemView,
    props: true,
    meta: {
      title: 'Задача'
    }
  },
  {
    path: '/profile',
    name: 'profile',
    component: ProfileView,
    meta: { 
      requiresAuth: true,
      title: 'Профиль'
    }
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('@/views/admin/AdminLayout.vue'),
    meta: { 
      requiresAuth: true,
      requiresAdmin: true,
      title: 'Панель управления'
    },
    children: [
      {
        path: 'problems',
        name: 'admin-problems',
        component: () => import('@/views/admin/ProblemList.vue'),
        meta: { 
          title: 'Управление задачами'
        }
      },
      {
        path: 'problems/create',
        name: 'admin-problem-create',
        component: () => import('@/views/admin/ProblemForm.vue'),
        meta: { 
          title: 'Создание задачи'
        }
      },
      {
        path: 'problems/:id/edit',
        name: 'admin-problem-edit',
        component: () => import('@/views/admin/ProblemForm.vue'),
        props: true,
        meta: { 
          title: 'Редактирование задачи'
        }
      },
      {
        path: 'tags',
        name: 'admin-tags',
        component: () => import('@/views/admin/TagList.vue'),
        meta: { 
          title: 'Управление тегами'
        }
      },
      {
        path: 'users',
        name: 'admin-users',
        component: () => import('@/views/admin/UserList.vue'),
        meta: { 
          title: 'Управление пользователями'
        }
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/components/Login.vue'),
    meta: {
      title: 'Вход в систему'
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/components/NotFound.vue'),
    meta: {
      title: 'Страница не найдена'
    }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// Защита маршрутов, требующих авторизации
router.beforeEach((to, from, next) => {
  // Установка заголовка страницы
  document.title = `${to.meta.title} | LeetCode Clone`

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isAuthenticated()) {
      next({ 
        name: 'login',
        query: { redirect: to.fullPath }
      })
    } else if (to.matched.some(record => record.meta.requiresAdmin) && !isAdmin()) {
      next({ name: 'home' })
    } else {
      next()
    }
  } else {
    next()
  }
})

// Глобальный guard после навигации
router.afterEach((to, from) => {
  console.log(`Navigated from ${String(from.name)} to ${String(to.name)}`)
})

export default router
