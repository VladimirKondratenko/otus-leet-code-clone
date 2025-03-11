<template>
  <div class="user-list">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h1>Управление пользователями</h1>
    </div>

    <div class="card">
      <div class="card-body">
        <div class="table-responsive">
          <table class="table table-hover">
            <thead>
              <tr>
                <th>ID</th>
                <th>Email</th>
                <th>Имя пользователя</th>
                <th>Роль</th>
                <th>Решено задач</th>
                <th>Действия</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in users" :key="user.id">
                <td>{{ user.id }}</td>
                <td>{{ user.email }}</td>
                <td>{{ user.username }}</td>
                <td>
                  <select 
                    class="form-select form-select-sm"
                    v-model="user.role"
                    @change="handleRoleChange(user)"
                    :disabled="isCurrentUser(user.id)"
                  >
                    <option value="user">Пользователь</option>
                    <option value="admin">Администратор</option>
                  </select>
                </td>
                <td>{{ user.solvedProblems }}</td>
                <td>
                  <div class="btn-group">
                    <button 
                      class="btn btn-sm btn-outline-danger"
                      @click="handleBlock(user)"
                      :disabled="isCurrentUser(user.id)"
                    >
                      {{ user.isBlocked ? 'Разблокировать' : 'Заблокировать' }}
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

interface User {
  id: number
  email: string
  username: string
  role: 'user' | 'admin'
  solvedProblems: number
  isBlocked: boolean
}

export default defineComponent({
  name: 'UserList',

  setup() {
    const users = ref<User[]>([])
    const isLoading = ref(false)
    const currentUserId = ref(parseInt(localStorage.getItem('userId') || '0'))

    const fetchUsers = async () => {
      try {
        isLoading.value = true
        const response = await fetch('/api/users')
        const data = await response.json()
        users.value = data
      } catch (error) {
        console.error('Ошибка при загрузке пользователей:', error)
      } finally {
        isLoading.value = false
      }
    }

    const handleRoleChange = async (user: User) => {
      try {
        const response = await fetch(`/api/users/${user.id}/role`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ role: user.role })
        })

        if (!response.ok) {
          throw new Error('Ошибка при изменении роли')
        }
      } catch (error) {
        console.error('Ошибка при изменении роли:', error)
        // Откатываем изменение в случае ошибки
        await fetchUsers()
      }
    }

    const handleBlock = async (user: User) => {
      const action = user.isBlocked ? 'unblock' : 'block'
      if (!confirm(`Вы уверены, что хотите ${action === 'block' ? 'заблокировать' : 'разблокировать'} этого пользователя?`)) {
        return
      }

      try {
        const response = await fetch(`/api/users/${user.id}/${action}`, {
          method: 'POST'
        })

        if (response.ok) {
          user.isBlocked = !user.isBlocked
        } else {
          throw new Error(`Ошибка при ${action === 'block' ? 'блокировке' : 'разблокировке'} пользователя`)
        }
      } catch (error) {
        console.error('Ошибка:', error)
      }
    }

    const isCurrentUser = (userId: number): boolean => {
      return userId === currentUserId.value
    }

    onMounted(fetchUsers)

    return {
      users,
      isLoading,
      handleRoleChange,
      handleBlock,
      isCurrentUser
    }
  }
})
</script>

<style scoped>
.user-list {
  max-width: 1200px;
  margin: 0 auto;
}

.form-select-sm {
  width: auto;
  min-width: 120px;
}

.btn-group .btn {
  padding: 0.25rem 0.5rem;
}
</style> 