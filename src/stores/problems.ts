import { defineStore } from 'pinia'
import axios from 'axios'

interface Problem {
  id: string
  title: string
  description: string
  difficulty: 'easy' | 'medium' | 'hard'
  category: string
  examples: Array<{
    input: string
    output: string
    explanation?: string
  }>
  comments: Array<{
    id: string
    text: string
    author: {
      name: string
      avatar: string
    }
  }>
}

export const useProblemsStore = defineStore('problems', {
  state: () => ({
    problems: [] as Problem[],
    currentProblem: null as Problem | null,
    loading: false,
    error: null as string | null
  }),

  actions: {
    async fetchProblems() {
      this.loading = true
      try {
        const response = await axios.get('/api/problems')
        this.problems = response.data
      } catch (error) {
        this.error = 'Ошибка при загрузке задач'
        console.error('Error fetching problems:', error)
      } finally {
        this.loading = false
      }
    },

    async fetchProblem(id: string) {
      this.loading = true
      try {
        const response = await axios.get(`/api/problems/${id}`)
        this.currentProblem = response.data
        return response.data
      } catch (error) {
        this.error = 'Ошибка при загрузке задачи'
        console.error('Error fetching problem:', error)
      } finally {
        this.loading = false
      }
    },

    async submitSolution(problemId: string, code: string, language: string) {
      try {
        const response = await axios.post(`/api/problems/${problemId}/submit`, {
          code,
          language
        })
        return response.data
      } catch (error) {
        this.error = 'Ошибка при отправке решения'
        console.error('Error submitting solution:', error)
        throw error
      }
    },

    async addComment(problemId: string, text: string) {
      try {
        const response = await axios.post(`/api/problems/${problemId}/comments`, {
          text
        })
        
        if (this.currentProblem) {
          this.currentProblem.comments.push(response.data)
        }
        
        return response.data
      } catch (error) {
        this.error = 'Ошибка при добавлении комментария'
        console.error('Error adding comment:', error)
        throw error
      }
    }
  },

  getters: {
    getProblemById: (state) => {
      return (id: string) => state.problems.find(p => p.id === id)
    },
    
    filteredProblems: (state) => {
      return (difficulty?: string, category?: string) => {
        return state.problems.filter(p => {
          if (difficulty && p.difficulty !== difficulty) return false
          if (category && p.category !== category) return false
          return true
        })
      }
    }
  }
}) 