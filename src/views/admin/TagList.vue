<template>
  <div class="tag-list">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h1>Управление тегами</h1>
      <button class="btn btn-primary" @click="showCreateModal">
        Создать тег
      </button>
    </div>

    <div class="card">
      <div class="card-body">
        <div class="table-responsive">
          <table class="table table-hover">
            <thead>
              <tr>
                <th>ID</th>
                <th>Название</th>
                <th>Количество задач</th>
                <th>Действия</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="tag in tags" :key="tag.id">
                <td>{{ tag.id }}</td>
                <td>{{ tag.name }}</td>
                <td>{{ tag.problemCount }}</td>
                <td>
                  <div class="btn-group">
                    <button 
                      class="btn btn-sm btn-outline-primary"
                      @click="showEditModal(tag)"
                    >
                      Редактировать
                    </button>
                    <button 
                      class="btn btn-sm btn-outline-danger"
                      @click="handleDelete(tag.id)"
                      :disabled="tag.problemCount > 0"
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

    <!-- Модальное окно для создания/редактирования тега -->
    <div 
      class="modal fade" 
      id="tagModal" 
      tabindex="-1"
      ref="modal"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">
              {{ isEditing ? 'Редактирование тега' : 'Создание тега' }}
            </h5>
            <button 
              type="button" 
              class="btn-close" 
              data-bs-dismiss="modal"
            ></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="handleSubmit">
              <div class="mb-3">
                <label for="tagName" class="form-label">Название</label>
                <input
                  type="text"
                  class="form-control"
                  id="tagName"
                  v-model="form.name"
                  required
                >
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button 
              type="button" 
              class="btn btn-secondary" 
              data-bs-dismiss="modal"
            >
              Отмена
            </button>
            <button
              type="button"
              class="btn btn-primary"
              @click="handleSubmit"
              :disabled="isLoading"
            >
              {{ isLoading ? 'Сохранение...' : 'Сохранить' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { Modal } from 'bootstrap'

interface Tag {
  id: number
  name: string
  problemCount: number
}

interface TagForm {
  name: string
}

export default defineComponent({
  name: 'TagList',

  setup() {
    const tags = ref<Tag[]>([])
    const isLoading = ref(false)
    const isEditing = ref(false)
    const editingId = ref<number | null>(null)
    const modal = ref<Modal | null>(null)
    
    const form = ref<TagForm>({
      name: ''
    })

    const fetchTags = async () => {
      try {
        isLoading.value = true
        const response = await fetch('/api/tags')
        const data = await response.json()
        tags.value = data
      } catch (error) {
        console.error('Ошибка при загрузке тегов:', error)
      } finally {
        isLoading.value = false
      }
    }

    const showCreateModal = () => {
      isEditing.value = false
      editingId.value = null
      form.value = { name: '' }
      modal.value?.show()
    }

    const showEditModal = (tag: Tag) => {
      isEditing.value = true
      editingId.value = tag.id
      form.value = { name: tag.name }
      modal.value?.show()
    }

    const handleSubmit = async () => {
      try {
        isLoading.value = true
        const url = isEditing.value 
          ? `/api/tags/${editingId.value}`
          : '/api/tags'
        
        const response = await fetch(url, {
          method: isEditing.value ? 'PUT' : 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(form.value)
        })

        if (!response.ok) {
          throw new Error('Ошибка при сохранении тега')
        }

        await fetchTags()
        modal.value?.hide()
      } catch (error) {
        console.error('Ошибка при сохранении тега:', error)
      } finally {
        isLoading.value = false
      }
    }

    const handleDelete = async (id: number) => {
      if (!confirm('Вы уверены, что хотите удалить этот тег?')) {
        return
      }

      try {
        const response = await fetch(`/api/tags/${id}`, {
          method: 'DELETE'
        })

        if (response.ok) {
          tags.value = tags.value.filter(t => t.id !== id)
        } else {
          throw new Error('Ошибка при удалении тега')
        }
      } catch (error) {
        console.error('Ошибка при удалении тега:', error)
      }
    }

    onMounted(() => {
      fetchTags()
      const modalElement = document.getElementById('tagModal')
      if (modalElement) {
        modal.value = new Modal(modalElement)
      }
    })

    return {
      tags,
      form,
      isLoading,
      isEditing,
      showCreateModal,
      showEditModal,
      handleSubmit,
      handleDelete
    }
  }
})
</script>

<style scoped>
.tag-list {
  max-width: 1200px;
  margin: 0 auto;
}

.btn-group .btn {
  padding: 0.25rem 0.5rem;
}
</style> 