import { defineStore } from 'pinia'
import axios from 'axios'

interface User {
  id: string
  name: string
  username: string
  avatar: string
  rating: number
  solvedProblems: number
}

interface UserStats {
  easySolved: number
  easyTotal: number
  mediumSolved: number
  mediumTotal: number
  hardSolved: number
  hardTotal: number
}

interface Solution {
  id: string
  problemId: string
  problemTitle: string
  difficulty: string
  solvedAt: string
}

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null as User | null,
    stats: null as UserStats | null,
    recentSolutions: [] as Solution[],
    loading: false,
    error: null as string | null
  }),

  actions: {
    async fetchUserProfile() {
      this.loading = true
      try {
        const response = await axios.get('/api/user/profile')
        this.user = response.data
        return response.data
      } catch (error) {
        this.error = 'Ошибка при загрузке профиля'
        console.error('Error fetching user profile:', error)
      } finally {
        this.loading = false
      }
    },

    async fetchUserStats() {
      try {
        const response = await axios.get('/api/user/stats')
        this.stats = response.data
        return response.data
      } catch (error) {
        this.error = 'Ошибка при загрузке статистики'
        console.error('Error fetching user stats:', error)
      }
    },

    async fetchRecentSolutions() {
      try {
        const response = await axios.get('/api/user/solutions/recent')
        this.recentSolutions = response.data
        return response.data
      } catch (error) {
        this.error = 'Ошибка при загрузке последних решений'
        console.error('Error fetching recent solutions:', error)
      }
    },

    async updateProfile(profileData: Partial<User>) {
      try {
        const response = await axios.put('/api/user/profile', profileData)
        this.user = response.data
        return response.data
      } catch (error) {
        this.error = 'Ошибка при обновлении профиля'
        console.error('Error updating profile:', error)
        throw error
      }
    }
  },

  getters: {
    isAuthenticated(): boolean {
      return !!this.user
    },
    
    totalSolvedProblems(): number {
      if (!this.stats) return 0
      return this.stats.easySolved + this.stats.mediumSolved + this.stats.hardSolved
    }
  }
}) 