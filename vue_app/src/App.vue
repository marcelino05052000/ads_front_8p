<script setup>
import { ref, computed } from 'vue'
import Home from './NewScreen.vue'
import Crud from './Crud.vue'

const routes = {
  '/': Home,
  '/crud': Crud
}

const currentPath = ref(window.location.hash)

window.addEventListener('hashchange', () => {
  currentPath.value = window.location.hash
})

const currentView = computed(() => {
  return routes[currentPath.value.slice(1) || '/']
})
</script>

<template>
  <a href="#/">Home</a> |
  <a href="#/crud">Crud</a>
  <component :is="currentView" />
</template>