<template>
  <div class="user-profile">
    <div class="row">
      <div class="col-md-4">
        <div class="profile-card card">
          <div class="card-body text-center">
            <div class="avatar mb-3">
              <img :src="user.avatarUrl || '/default-avatar.png'" alt="User avatar" class="rounded-circle" width="150">
            </div>
            <h3 class="card-title">{{ user.username }}</h3>
            <p class="text-muted">На платформе с {{ formatDate(user.joinedAt) }}</p>
            <div class="stats">
              <div class="row">
                <div class="col-4">
                  <div class="stat-item">
                    <h4>{{ user.solvedTasks }}</h4>
                    <span class="text-muted">Решено задач</span>
                  </div>
                </div>
                <div class="col-4">
                  <div class="stat-item">
                    <h4>{{ user.rank }}</h4>
                    <span class="text-muted">Рейтинг</span>
                  </div>
                </div>
                <div class="col-4">
                  <div class="stat-item">
                    <h4>{{ user.contributions }}</h4>
                    <span class="text-muted">Вклад</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-md-8">
        <div class="solved-tasks card">
          <div class="card-body">
            <h4 class="card-title">Решенные задачи</h4>
            <div class="difficulty-stats mb-4">
              <div class="progress">
                <div 
                  class="progress-bar bg-success" 
                  :style="{ width: (stats.easy / stats.total * 100) + '%' }"
                  title="Легкие задачи"
                >
                  {{ stats.easy }}
                </div>
                <div 
                  class="progress-bar bg-warning" 
                  :style="{ width: (stats.medium / stats.total * 100) + '%' }"
                  title="Средние задачи"
                >
                  {{ stats.medium }}
                </div>
                <div 
                  class="progress-bar bg-danger" 
                  :style="{ width: (stats.hard / stats.total * 100) + '%' }"
                  title="Сложные задачи"
                >
                  {{ stats.hard }}
                </div>
              </div>
              <div class="difficulty-legend mt-2">
                <span class="badge bg-success">Легкие: {{ stats.easy }}</span>
                <span class="badge bg-warning ms-2">Средние: {{ stats.medium }}</span>
                <span class="badge bg-danger ms-2">Сложные: {{ stats.hard }}</span>
              </div>
            </div>

            <div class="recent-solutions">
              <h5>Последние решения</h5>
              <div class="table-responsive">
                <table class="table">
                  <thead>
                    <tr>
                      <th>Задача</th>
                      <th>Сложность</th>
                      <th>Язык</th>
                      <th>Дата решения</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="solution in recentSolutions" :key="solution.id">
                      <td>
                        <router-link :to="{ name: 'task', params: { id: solution.taskId }}">
                          {{ solution.taskTitle }}
                        </router-link>
                      </td>
                      <td>
                        <span :class="['badge', getDifficultyClass(solution.difficulty)]">
                          {{ solution.difficulty }}
                        </span>
                      </td>
                      <td>{{ solution.language }}</td>
                      <td>{{ formatDate(solution.solvedAt) }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';

interface User {
  username: string;
  avatarUrl?: string;
  joinedAt: Date;
  solvedTasks: number;
  rank: number;
  contributions: number;
}

interface Solution {
  id: string;
  taskId: string;
  taskTitle: string;
  difficulty: string;
  language: string;
  solvedAt: Date;
}

interface Stats {
  easy: number;
  medium: number;
  hard: number;
  total: number;
}

export default defineComponent({
  name: 'UserProfile',
  props: {
    userId: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const user = ref<User>({
      username: '',
      joinedAt: new Date(),
      solvedTasks: 0,
      rank: 0,
      contributions: 0
    });

    const stats = ref<Stats>({
      easy: 0,
      medium: 0,
      hard: 0,
      total: 0
    });

    const recentSolutions = ref<Solution[]>([]);

    const formatDate = (date: Date) => {
      return new Date(date).toLocaleDateString('ru-RU');
    };

    const getDifficultyClass = (difficulty: string): string => {
      const classes: Record<string, string> = {
        easy: 'bg-success',
        medium: 'bg-warning',
        hard: 'bg-danger'
      };
      return classes[difficulty] || 'bg-secondary';
    };

    // TODO: Implement data fetching
    const fetchUserData = async () => {
      // Fetch user data from API
    };

    return {
      user,
      stats,
      recentSolutions,
      formatDate,
      getDifficultyClass
    };
  }
});
</script>

<style scoped>
.user-profile {
  padding: 20px;
}

.profile-card {
  margin-bottom: 20px;
}

.avatar img {
  border: 3px solid #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.stat-item {
  padding: 10px;
}

.stat-item h4 {
  margin: 0;
  font-size: 1.5rem;
  font-weight: bold;
}

.progress {
  height: 25px;
}

.progress-bar {
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}

.badge {
  font-size: 0.8rem;
  padding: 0.4em 0.8em;
}

.table {
  font-size: 0.9rem;
}

.table td {
  vertical-align: middle;
}
</style> 