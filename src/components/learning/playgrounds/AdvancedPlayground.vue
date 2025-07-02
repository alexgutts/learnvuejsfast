<template>
  <div class="advanced-playground">
    <h4>🎯 Advanced Vue Patterns</h4>
    <div class="advanced-demo">
      <div class="pattern-demo">
        <h5>Provide/Inject Pattern</h5>
        <p>Theme: {{ theme }}</p>
        <button @click="toggleTheme" class="theme-btn">Toggle Theme</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, provide } from 'vue'

const theme = ref('light')
const toggleTheme = () => {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
}

provide('theme', theme)

const emit = defineEmits(['interaction'])
</script>

<style scoped>
.advanced-playground {
  padding: 1rem;
  background: #fef7ff;
  border-radius: 8px;
  border: 2px solid #f3e8ff;
}

.advanced-demo {
  background: white;
  padding: 1rem;
  border-radius: 8px;
  border: 2px solid #a855f7;
}

.pattern-demo {
  text-align: center;
}

.theme-btn {
  background: #a855f7;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
}
</style> 