<template>
  <div class="problem-view">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Описание задачи -->
      <div class="problem-description p-6 bg-white rounded-lg shadow">
        <h1 class="text-2xl font-bold mb-4">{{ problem?.title }}</h1>
        <div class="difficulty mb-4">
          <span :class="getDifficultyClass(problem?.difficulty)" 
                class="px-3 py-1 rounded-full text-sm">
            {{ problem?.difficulty }}
          </span>
        </div>
        
        <div class="description prose mb-6">
          <div v-html="problem?.description"></div>
        </div>

        <div class="examples space-y-4">
          <h3 class="text-xl font-semibold">Примеры:</h3>
          <div v-for="(example, index) in problem?.examples" :key="index" 
               class="example p-4 bg-gray-50 rounded">
            <p><strong>Вход:</strong> {{ example.input }}</p>
            <p><strong>Выход:</strong> {{ example.output }}</p>
            <p v-if="example.explanation"><strong>Объяснение:</strong> {{ example.explanation }}</p>
          </div>
        </div>
      </div>

      <!-- Редактор кода -->
      <div class="code-editor p-6 bg-white rounded-lg shadow">
        <div class="mb-4">
          <select v-model="selectedLanguage" class="form-select">
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
          </select>
        </div>

        <div class="monaco-editor-container h-[500px]">
          <!-- Здесь будет подключен Monaco Editor -->
        </div>

        <div class="actions mt-4 flex gap-4">
          <button @click="runCode" 
                  class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Запустить
          </button>
          <button @click="submitSolution" 
                  class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
            Отправить
          </button>
        </div>
      </div>
    </div>

    <!-- Секция комментариев -->
    <div class="comments-section mt-8 p-6 bg-white rounded-lg shadow">
      <h2 class="text-xl font-bold mb-4">Комментарии</h2>
      <div class="add-comment mb-6">
        <textarea v-model="newComment" 
                  class="w-full p-3 border rounded" 
                  placeholder="Добавить комментарий..."></textarea>
        <button @click="submitComment" 
                class="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Отправить комментарий
        </button>
      </div>

      <div class="comments-list space-y-4">
        <div v-for="comment in problem?.comments" :key="comment.id" 
             class="comment p-4 bg-gray-50 rounded">
          <div class="flex items-center gap-2 mb-2">
            <img :src="comment.author.avatar" 
                 :alt="comment.author.name" 
                 class="w-8 h-8 rounded-full">
            <span class="font-semibold">{{ comment.author.name }}</span>
          </div>
          <p>{{ comment.text }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useProblemStore } from '@/stores/problems'

const route = useRoute()
const problemStore = useProblemStore()
const selectedLanguage = ref('javascript')
const newComment = ref('')

const problem = ref(null)

onMounted(async () => {
  const problemId = route.params.id as string
  problem.value = await problemStore.fetchProblem(problemId)
})

const getDifficultyClass = (difficulty: string) => {
  const classes = {
    easy: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    hard: 'bg-red-100 text-red-800'
  }
  return classes[difficulty as keyof typeof classes] || ''
}

const runCode = () => {
  // Реализация запуска кода
}

const submitSolution = () => {
  // Реализация отправки решения
}

const submitComment = () => {
  // Реализация отправки комментария
}
</script> 