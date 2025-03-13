<template>
  <div class="min-h-screen bg-gray-50">
    <nav class="bg-white shadow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex">
            <router-link to="/" class="flex-shrink-0 flex items-center">
              <img class="h-8 w-auto" src="@/assets/logo.svg" alt="Logo">
            </router-link>
          </div>
          <div class="flex items-center">
            <router-link 
              to="/profile" 
              class="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
            >
              Профиль
            </router-link>
          </div>
        </div>
      </div>
    </nav>

    <main class="h-[calc(100vh-4rem)]">
      <slot></slot>
    </main>
  </div>
</template>

<script setup lang="ts">
// Layout для страницы задачи занимает весь экран для редактора кода
</script> 