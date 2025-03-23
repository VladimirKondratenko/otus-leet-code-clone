<template>
  <div class="task-detail">
    <div class="row">
      <div class="col-md-6">
        <div class="task-description card">
          <div class="card-body">
            <h2 class="card-title">{{ task.title }}</h2>
            <div class="task-meta mb-3">
              <span :class="['badge', difficultyClass]">{{ task.difficulty }}</span>
              <span class="badge bg-secondary ms-2">{{ task.category }}</span>
            </div>
            <div class="description" v-html="task.description"></div>
            
            <div class="examples mt-4">
              <h4>Примеры:</h4>
              <div v-for="(example, index) in task.examples" :key="index" class="example card mb-3">
                <div class="card-body">
                  <h5>Пример {{ index + 1 }}</h5>
                  <pre><code>Вход: {{ example.input }}
Выход: {{ example.output }}
                  </code></pre>
                  <p v-if="example.explanation" class="mt-2">Объяснение: {{ example.explanation }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="comments card mt-4">
          <div class="card-body">
            <h4>Комментарии</h4>
            <div class="comment-list">
              <div v-for="comment in comments" :key="comment.id" class="comment mb-3">
                <div class="comment-header">
                  <strong>{{ comment.author }}</strong>
                  <small class="text-muted ms-2">{{ formatDate(comment.createdAt) }}</small>
                </div>
                <div class="comment-body">{{ comment.text }}</div>
              </div>
            </div>
            <div class="add-comment mt-4">
              <textarea v-model="newComment" class="form-control" rows="3" placeholder="Добавить комментарий..."></textarea>
              <button @click="submitComment" class="btn btn-primary mt-2">Отправить</button>
            </div>
          </div>
        </div>
      </div>

      <div class="col-md-6">
        <div class="code-editor card">
          <div class="card-body">
            <div class="language-selector mb-3">
              <select v-model="selectedLanguage" class="form-select">
                <option v-for="lang in availableLanguages" :key="lang.id" :value="lang.id">
                  {{ lang.name }}
                </option>
              </select>
            </div>
            <div class="editor-container">
              <textarea
                v-model="code"
                class="form-control code-textarea"
                rows="20"
                placeholder="Введите ваше решение здесь..."
              ></textarea>
            </div>
            <div class="actions mt-3">
              <button @click="runCode" class="btn btn-success me-2">Запустить</button>
              <button @click="submitSolution" class="btn btn-primary">Отправить решение</button>
            </div>
            <div v-if="results" class="results mt-3">
              <h5>Результаты:</h5>
              <pre><code>{{ results }}</code></pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';

interface Task {
  id: string;
  title: string;
  description: string;
  difficulty: string;
  category: string;
  examples: Array<{
    input: string;
    output: string;
    explanation?: string;
  }>;
}

interface Comment {
  id: string;
  author: string;
  text: string;
  createdAt: Date;
}

interface Language {
  id: string;
  name: string;
}

export default defineComponent({
  name: 'TaskDetail',
  props: {
    taskId: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const task = ref<Task>({} as Task);
    const comments = ref<Comment[]>([]);
    const newComment = ref('');
    const code = ref('');
    const results = ref('');
    const selectedLanguage = ref('python');

    const availableLanguages = ref<Language[]>([
      { id: 'python', name: 'Python' },
      { id: 'javascript', name: 'JavaScript' },
      { id: 'java', name: 'Java' },
      { id: 'cpp', name: 'C++' }
    ]);

    const difficultyClass = computed(() => {
      const classes: Record<string, string> = {
        easy: 'bg-success',
        medium: 'bg-warning',
        hard: 'bg-danger'
      };
      return classes[task.value.difficulty] || 'bg-secondary';
    });

    const formatDate = (date: Date) => {
      return new Date(date).toLocaleDateString('ru-RU');
    };

    const runCode = async () => {
      // TODO: Implement code execution
      results.value = 'Выполнение кода...';
    };

    const submitSolution = async () => {
      // TODO: Implement solution submission
      results.value = 'Отправка решения...';
    };

    const submitComment = async () => {
      // TODO: Implement comment submission
      if (newComment.value.trim()) {
        // Add comment logic here
        newComment.value = '';
      }
    };

    return {
      task,
      comments,
      newComment,
      code,
      results,
      selectedLanguage,
      availableLanguages,
      difficultyClass,
      formatDate,
      runCode,
      submitSolution,
      submitComment
    };
  }
});
</script>

<style scoped>
.task-detail {
  padding: 20px;
}

.task-description {
  margin-bottom: 20px;
}

.example pre {
  background-color: #f8f9fa;
  padding: 10px;
  border-radius: 4px;
}

.code-textarea {
  font-family: monospace;
  font-size: 14px;
  resize: vertical;
}

.comment {
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
}

.comment:last-child {
  border-bottom: none;
}

.comment-header {
  margin-bottom: 5px;
}

.badge {
  font-size: 0.8rem;
  padding: 0.4em 0.8em;
}
</style> 