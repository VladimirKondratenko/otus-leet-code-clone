import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import TaskList from '@/components/TaskList.vue';
import TaskDetail from '@/components/TaskDetail.vue';
import UserProfile from '@/components/UserProfile.vue';

const routes: Array&lt;RouteRecordRaw&gt; = [
  {
    path: '/',
    name: 'home',
    component: TaskList
  },
  {
    path: '/task/:id',
    name: 'task',
    component: TaskDetail,
    props: true
  },
  {
    path: '/profile/:userId',
    name: 'profile',
    component: UserProfile,
    props: true
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router; 