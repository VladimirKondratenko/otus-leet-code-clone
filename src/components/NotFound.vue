<template>
  <div class="not-found">
    <div class="text-center">
      <h1 class="display-1">404</h1>
      <h2 class="mb-4">Страница не найдена</h2>
      <p class="lead mb-4">К сожалению, запрашиваемая страница не существует или была перемещена.</p>
      <router-link to="/" class="btn btn-primary">
        Вернуться на главную
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'NotFound'
});
</script>

<style scoped>
.not-found {
  padding: 60px 20px;
}

.display-1 {
  font-size: 6rem;
  font-weight: 300;
  color: #2c3e50;
}

h2 {
  color: #34495e;
}

.lead {
  color: #7f8c8d;
}
</style> 