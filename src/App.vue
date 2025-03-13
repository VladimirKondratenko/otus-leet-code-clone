<template>
  <component :is="layout">
    <router-view></router-view>
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import ProblemLayout from '@/layouts/ProblemLayout.vue'
import AuthLayout from '@/layouts/AuthLayout.vue'

const route = useRoute()

const layout = computed(() => {
  const layoutMap: Record<string, any> = {
    default: DefaultLayout,
    problem: ProblemLayout,
    auth: AuthLayout,
    error: DefaultLayout
  }
  
  return layoutMap[route.meta.layout as string] || DefaultLayout
})
</script> 