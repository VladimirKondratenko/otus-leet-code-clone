<template>
  <div class="profile-view p-6">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <!-- Информация о пользователе -->
      <div class="user-info p-6 bg-white rounded-lg shadow">
        <div class="flex items-center gap-4 mb-6">
          <img :src="user?.avatar" :alt="user?.name" class="w-20 h-20 rounded-full">
          <div>
            <h1 class="text-2xl font-bold">{{ user?.name }}</h1>
            <p class="text-gray-600">@{{ user?.username }}</p>
          </div>
        </div>
        
        <div class="stats grid grid-cols-2 gap-4">
          <div class="stat p-4 bg-gray-50 rounded">
            <p class="text-gray-600">Рейтинг</p>
            <p class="text-2xl font-bold">{{ user?.rating }}</p>
          </div>
          <div class="stat p-4 bg-gray-50 rounded">
            <p class="text-gray-600">Решено задач</p>
            <p class="text-2xl font-bold">{{ user?.solvedProblems }}</p>
          </div>
        </div>
      </div>

      <!-- Статистика решений -->
      <div class="solutions-stats col-span-2 p-6 bg-white rounded-lg shadow">
        <h2 class="text-xl font-bold mb-4">Статистика решений</h2>
        <div class="grid grid-cols-3 gap-4 mb-6">
          <div class="stat p-4 bg-green-50 rounded">
            <p class="text-green-600">Легкие</p>
            <p class="text-2xl font-bold text-green-700">{{ stats?.easySolved }} / {{ stats?.easyTotal }}</p>
          </div>
          <div class="stat p-4 bg-yellow-50 rounded">
            <p class="text-yellow-600">Средние</p>
            <p class="text-2xl font-bold text-yellow-700">{{ stats?.mediumSolved }} / {{ stats?.mediumTotal }}</p>
          </div>
          <div class="stat p-4 bg-red-50 rounded">
            <p class="text-red-600">Сложные</p>
            <p class="text-2xl font-bold text-red-700">{{ stats?.hardSolved }} / {{ stats?.hardTotal }}</p>
          </div>
        </div>

        <!-- График активности -->
        <div class="activity-chart h-48 bg-gray-50 rounded mb-6">
          <!-- Здесь будет график активности -->
        </div>
      </div>
    </div>

    <!-- Последние решенные задачи -->
    <div class="recent-solutions mt-6 p-6 bg-white rounded-lg shadow">
      <h2 class="text-xl font-bold mb-4">Последние решенные задачи</h2>
      <div class="solutions-list">
        <div v-for="solution in recentSolutions" :key="solution.id" 
             class="solution p-4 border-b last:border-b-0">
          <div class="flex justify-between items-center">
            <router-link :to="{ name: 'problem', params: { id: solution.problemId }}" 
                        class="text-lg font-semibold hover:text-blue-600">
              {{ solution.problemTitle }}
            </router-link>
            <span :class="getDifficultyClass(solution.difficulty)" 
                  class="px-3 py-1 rounded-full text-sm">
              {{ solution.difficulty }}
            </span>
          </div>
          <p class="text-gray-600">Решено: {{ formatDate(solution.solvedAt) }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
const user = ref(null)
const stats = ref(null)
const recentSolutions = ref([])

onMounted(async () => {
  user.value = await userStore.fetchUserProfile()
  stats.value = await userStore.fetchUserStats()
  recentSolutions.value = await userStore.fetchRecentSolutions()
})

const getDifficultyClass = (difficulty: string) => {
  const classes = {
    easy: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    hard: 'bg-red-100 text-red-800'
  }
  return classes[difficulty as keyof typeof classes] || ''
}

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('ru-RU')
}
</script> 