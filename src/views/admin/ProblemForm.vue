<template>
  <div class="problem-form">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h1>{{ isEditing ? 'Редактирование задачи' : 'Создание задачи' }}</h1>
      <router-link :to="{ name: 'admin-problems' }" class="btn btn-outline-secondary">
        Назад к списку
      </router-link>
    </div>

    <div class="card">
      <div class="card-body">
        <form @submit.prevent="handleSubmit">
          <div class="mb-3">
            <label for="title" class="form-label">Название</label>
            <input
              type="text"
              class="form-control"
              id="title"
              v-model="form.title"
              required
            >
          </div>

          <div class="mb-3">
            <label for="description" class="form-label">Описание</label>
            <textarea
              class="form-control"
              id="description"
              v-model="form.description"
              rows="5"
              required
            ></textarea>
          </div>

          <div class="row mb-3">
            <div class="col-md-6">
              <label for="difficulty" class="form-label">Сложность</label>
              <select
                class="form-select"
                id="difficulty"
                v-model="form.difficulty"
                required
              >
                <option value="easy">Легкая</option>
                <option value="medium">Средняя</option>
                <option value="hard">Сложная</option>
              </select>
            </div>
            
            <div class="col-md-6">
              <label for="tags" class="form-label">Теги</label>
              <select
                class="form-select"
                id="tags"
                v-model="form.tags"
                multiple
              >
                <option v-for="tag in availableTags" :key="tag.id" :value="tag.id">
                  {{ tag.name }}
                </option>
              </select>
            </div>
          </div>

          <div class="examples mb-3">
            <label class="form-label">Примеры</label>
            <div v-for="(example, index) in form.examples" :key="index" class="example card mb-3">
              <div class="card-body">
                <div class="mb-3">
                  <label :for="'input' + index" class="form-label">Входные данные</label>
                  <textarea
                    :id="'input' + index"
                    class="form-control"
                    v-model="example.input"
                    rows="2"
                    required
                  ></textarea>
                </div>
                <div class="mb-3">
                  <label :for="'output' + index" class="form-label">Выходные данные</label>
                  <textarea
                    :id="'output' + index"
                    class="form-control"
                    v-model="example.output"
                    rows="2"
                    required
                  ></textarea>
                </div>
                <div class="mb-3">
                  <label :for="'explanation' + index" class="form-label">Объяснение</label>
                  <textarea
                    :id="'explanation' + index"
                    class="form-control"
                    v-model="example.explanation"
                    rows="2"
                  ></textarea>
                </div>
                <button
                  type="button"
                  class="btn btn-outline-danger btn-sm"
                  @click="removeExample(index)"
                >
                  Удалить пример
                </button>
              </div>
            </div>
            <button
              type="button"
              class="btn btn-outline-primary"
              @click="addExample"
            >
              Добавить пример
            </button>
          </div>

          <div class="d-flex justify-content-end gap-2">
            <button
              type="button"
              class="btn btn-outline-secondary"
              @click="resetForm"
            >
              Сбросить
            </button>
            <button
              type="submit"
              class="btn btn-primary"
              :disabled="isLoading"
            >
              {{ isLoading ? 'Сохранение...' : 'Сохранить' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

interface Tag {
  id: number
  name: string
}

interface Example {
  input: string
  output: string
  explanation?: string
}

interface ProblemForm {
  title: string
  description: string
  difficulty: 'easy' | 'medium' | 'hard'
  tags: number[]
  examples: Example[]
}

export default defineComponent({
  name: 'ProblemForm',

  setup() {
    const route = useRoute()
    const router = useRouter()
    const isLoading = ref(false)
    const availableTags = ref<Tag[]>([])

    const form = ref<ProblemForm>({
      title: '',
      description: '',
      difficulty: 'easy',
      tags: [],
      examples: [{ input: '', output: '', explanation: '' }]
    })

    const isEditing = computed(() => !!route.params.id)

    const fetchTags = async () => {
      try {
        const response = await fetch('/api/tags')
        const data = await response.json()
        availableTags.value = data
      } catch (error) {
        console.error('Ошибка при загрузке тегов:', error)
      }
    }

    const fetchProblem = async () => {
      if (!isEditing.value) return

      try {
        isLoading.value = true
        const response = await fetch(`/api/problems/${route.params.id}`)
        const data = await response.json()
        form.value = {
          ...data,
          tags: data.tags.map((tag: Tag) => tag.id)
        }
      } catch (error) {
        console.error('Ошибка при загрузке задачи:', error)
      } finally {
        isLoading.value = false
      }
    }

    const handleSubmit = async () => {
      try {
        isLoading.value = true
        const url = isEditing.value 
          ? `/api/problems/${route.params.id}`
          : '/api/problems'
        
        const response = await fetch(url, {
          method: isEditing.value ? 'PUT' : 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(form.value)
        })

        if (!response.ok) {
          throw new Error('Ошибка при сохранении задачи')
        }

        router.push({ name: 'admin-problems' })
      } catch (error) {
        console.error('Ошибка при сохранении задачи:', error)
      } finally {
        isLoading.value = false
      }
    }

    const addExample = () => {
      form.value.examples.push({ input: '', output: '', explanation: '' })
    }

    const removeExample = (index: number) => {
      form.value.examples.splice(index, 1)
    }

    const resetForm = () => {
      form.value = {
        title: '',
        description: '',
        difficulty: 'easy',
        tags: [],
        examples: [{ input: '', output: '', explanation: '' }]
      }
    }

    onMounted(() => {
      fetchTags()
      fetchProblem()
    })

    return {
      form,
      isLoading,
      isEditing,
      availableTags,
      handleSubmit,
      addExample,
      removeExample,
      resetForm
    }
  }
})
</script>

<style scoped>
.problem-form {
  max-width: 1200px;
  margin: 0 auto;
}

.example {
  border: 1px solid #dee2e6;
}

.example .card-body {
  padding: 1rem;
}
</style> 