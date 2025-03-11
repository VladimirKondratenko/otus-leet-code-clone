<template>
  <div class="problem-list">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h1>Управление задачами</h1>
      <router-link :to="{ name: 'admin-problem-create' }" class="btn btn-primary">
        Создать задачу
      </router-link>
    </div>

    <div class="card">
      <div class="card-body">
        <div class="table-responsive">
          <table class="table table-hover">
            <thead>
              <tr>
                <th>ID</th>
                <th>Название</th>
                <th>Сложность</th>
                <th>Теги</th>
                <th>Действия</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="problem in problems" :key="problem.id">
                <td>{{ problem.id }}</td>
                <td>{{ problem.title }}</td>
                <td>
                  <span :class="['badge', getDifficultyClass(problem.difficulty)]">
                    {{ problem.difficulty }}
                  </span>
                </td>
                <td>
                  <span 
                    v-for="tag in problem.tags" 
                    :key="tag.id" 
                    class="badge bg-secondary me-1"
                  >
                    {{ tag.name }}
                  </span>
                </td>
                <td>
                  <div class="btn-group">
                    <router-link 
                      :to="{ name: 'admin-problem-edit', params: { id: problem.id }}" 
                      class="btn btn-sm btn-outline-primary"
                    >
                      Редактировать
                    </router-link>
                    <button 
                      class="btn btn-sm btn-outline-danger"
                      @click="handleDelete(problem.id)"
                    >
                      Удалить
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'

interface Tag {
  id: number
  name: string
}

interface Problem {
  id: number
  title: string
  difficulty: 'easy' | 'medium' | 'hard'
  tags: Tag[]
}

export default defineComponent({
  name: 'ProblemList',
  
  setup() {
    const problems = ref<Problem[]>([])
    const isLoading = ref(false)

    const fetchProblems = async () => {
      try {
        isLoading.value = true
        const response = await fetch('/api/problems')
        const data = await response.json()
        problems.value = data
      } catch (error) {
        console.error('Ошибка при загрузке задач:', error)
      } finally {
        isLoading.value = false
      }
    }

    const handleDelete = async (id: number) => {
      if (!confirm('Вы уверены, что хотите удалить эту задачу?')) {
        return
      }

      try {
        const response = await fetch(`/api/problems/${id}`, {
          method: 'DELETE'
        })

        if (response.ok) {
          problems.value = problems.value.filter(p => p.id !== id)
        } else {
          throw new Error('Ошибка при удалении задачи')
        }
      } catch (error) {
        console.error('Ошибка при удалении задачи:', error)
      }
    }

    const getDifficultyClass = (difficulty: string): string => {
      const classes = {
        easy: 'bg-success',
        medium: 'bg-warning',
        hard: 'bg-danger'
      }
      return classes[difficulty as keyof typeof classes] || 'bg-secondary'
    }

    onMounted(fetchProblems)

    return {
      problems,
      isLoading,
      handleDelete,
      getDifficultyClass
    }
  }
})
</script>

<style scoped>
.problem-list {
  max-width: 1200px;
  margin: 0 auto;
}

.badge {
  font-size: 0.8rem;
  padding: 0.4em 0.8em;
}

.btn-group .btn {
  padding: 0.25rem 0.5rem;
}
</style> 