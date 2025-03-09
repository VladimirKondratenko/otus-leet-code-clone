<template>
  <div class="home">
    <h1 class="text-3xl font-bold mb-6">Задачи по программированию</h1>
    
    <div class="filters mb-6">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <select v-model="difficultyFilter" class="form-select">
          <option value="">Все уровни сложности</option>
          <option value="easy">Легкий</option>
          <option value="medium">Средний</option>
          <option value="hard">Сложный</option>
        </select>

        <select v-model="categoryFilter" class="form-select">
          <option value="">Все категории</option>
          <option value="arrays">Массивы</option>
          <option value="strings">Строки</option>
          <option value="dynamic">Динамическое программирование</option>
        </select>

        <select v-model="sortBy" class="form-select">
          <option value="popularity">По популярности</option>
          <option value="difficulty">По сложности</option>
          <option value="newest">Сначала новые</option>
        </select>
      </div>
    </div>

    <div class="problems-list">
      <div v-for="problem in filteredProblems" :key="problem.id" 
           class="problem-card p-4 mb-4 border rounded-lg hover:shadow-lg transition-shadow">
        <router-link :to="{ name: 'problem', params: { id: problem.id }}" 
                     class="flex justify-between items-center">
          <div>
            <h3 class="text-xl font-semibold">{{ problem.title }}</h3>
            <p class="text-gray-600">{{ problem.description }}</p>
          </div>
          <div class="flex items-center">
            <span :class="getDifficultyClass(problem.difficulty)" 
                  class="px-3 py-1 rounded-full text-sm">
              {{ problem.difficulty }}
            </span>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useProblemsStore } from '@/stores/problems'

const problemsStore = useProblemsStore()

const difficultyFilter = ref('')
const categoryFilter = ref('')
const sortBy = ref('popularity')

const filteredProblems = computed(() => {
  return problemsStore.problems
    .filter(problem => {
      if (!difficultyFilter.value) return true
      return problem.difficulty === difficultyFilter.value
    })
    .filter(problem => {
      if (!categoryFilter.value) return true
      return problem.category === categoryFilter.value
    })
})

const getDifficultyClass = (difficulty: string) => {
  const classes = {
    easy: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    hard: 'bg-red-100 text-red-800'
  }
  return classes[difficulty as keyof typeof classes] || ''
}
</script> 