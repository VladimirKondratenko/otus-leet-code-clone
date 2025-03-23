<template>
  <div class="task-list">
    <div class="filters mb-4">
      <div class="row">
        <div class="col-md-4">
          <select v-model="difficulty" class="form-select">
            <option value="">Все уровни сложности</option>
            <option value="easy">Легкий</option>
            <option value="medium">Средний</option>
            <option value="hard">Сложный</option>
          </select>
        </div>
        <div class="col-md-4">
          <select v-model="category" class="form-select">
            <option value="">Все категории</option>
            <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
          </select>
        </div>
        <div class="col-md-4">
          <select v-model="sortBy" class="form-select">
            <option value="popularity">По популярности</option>
            <option value="difficulty">По сложности</option>
            <option value="newest">Сначала новые</option>
          </select>
        </div>
      </div>
    </div>

    <div class="tasks">
      <div v-for="task in filteredTasks" :key="task.id" class="task-card card mb-3">
        <div class="card-body">
          <h5 class="card-title">
            <router-link :to="{ name: 'task', params: { id: task.id }}"">{{ task.title }}</router-link>
          </h5>
          <div class="task-meta">
            <span :class="['badge', difficultyClass(task.difficulty)]">{{ task.difficulty }}</span>
            <span class="badge bg-secondary ms-2">{{ task.category }}</span>
          </div>
          <p class="card-text mt-2">{{ task.shortDescription }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';

export default defineComponent({
  name: 'TaskList',
  setup() {
    const difficulty = ref('');
    const category = ref('');
    const sortBy = ref('popularity');
    const tasks = ref([]);
    const categories = ref(['Алгоритмы', 'Структуры данных', 'Базы данных', 'Математика']);

    const filteredTasks = computed(() => {
      let result = [...tasks.value];
      
      if (difficulty.value) {
        result = result.filter(task => task.difficulty === difficulty.value);
      }
      
      if (category.value) {
        result = result.filter(task => task.category === category.value);
      }
      
      switch (sortBy.value) {
        case 'popularity':
          result.sort((a, b) => b.popularity - a.popularity);
          break;
        case 'difficulty':
          const difficultyOrder = { easy: 1, medium: 2, hard: 3 };
          result.sort((a, b) => difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty]);
          break;
        case 'newest':
          result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
          break;
      }
      
      return result;
    });

    const difficultyClass = (difficulty: string) => {
      const classes = {
        easy: 'bg-success',
        medium: 'bg-warning',
        hard: 'bg-danger'
      };
      return classes[difficulty] || 'bg-secondary';
    };

    return {
      difficulty,
      category,
      sortBy,
      tasks,
      categories,
      filteredTasks,
      difficultyClass
    };
  }
});
</script>

<style scoped>
.task-list {
  padding: 20px;
}

.task-card {
  transition: transform 0.2s;
}

.task-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.task-meta {
  margin-top: 10px;
}

.badge {
  font-size: 0.8rem;
  padding: 0.4em 0.8em;
}
</style> 