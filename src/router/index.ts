<<<<<<< Updated upstream
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import ProblemView from '@/views/ProblemView.vue'
import ProfileView from '@/views/ProfileView.vue'
=======
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import TaskList from '@/components/TaskList.vue';
import TaskDetail from '@/components/TaskDetail.vue';
import UserProfile from '@/components/UserProfile.vue';

// Функция для проверки аутентификации
const isAuthenticated = (): boolean => {
  const token = localStorage.getItem('token');
  return !!token;
};

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: TaskList,
    meta: {
      title: 'Список задач',
      requiresAuth: false
    }
  },
  {
    path: '/task/:id',
    name: 'task',
    component: TaskDetail,
    props: true,
    meta: {
      title: 'Детали задачи',
      requiresAuth: false
    }
  },
  {
    path: '/profile/:userId',
    name: 'profile',
    component: UserProfile,
    props: true,
    meta: {
      title: 'Профиль пользователя',
      requiresAuth: true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/components/Login.vue'),
    meta: {
      title: 'Вход',
      requiresAuth: false
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/components/NotFound.vue'),
    meta: {
      title: 'Страница не найдена',
      requiresAuth: false
    }
  }
];
>>>>>>> Stashed changes

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/problem/:id',
      name: 'problem',
      component: ProblemView,
      props: true
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView,
      meta: { requiresAuth: true }
    }
  ]
})

<<<<<<< Updated upstream
// Защита маршрутов, требующих авторизации
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('token') // Простая проверка авторизации
  
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isAuthenticated) {
      next({ name: 'login' })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router 
=======
// Navigation Guards
router.beforeEach((to, from, next) => {
  // Установка заголовка страницы
  document.title = `${to.meta.title} | LeetCode Clone`;

  // Проверка аутентификации
  if (to.meta.requiresAuth && !isAuthenticated()) {
    // Сохраняем путь, куда пользователь пытался попасть
    next({ 
      name: 'login',
      query: { redirect: to.fullPath }
    });
  } else {
    next();
  }
});

// Глобальный guard после навигации
router.afterEach((to, from) => {
  // Можно добавить аналитику или другие действия после навигации
  console.log(`Navigated from ${String(from.name)} to ${String(to.name)}`);
});

export default router; 
>>>>>>> Stashed changes
