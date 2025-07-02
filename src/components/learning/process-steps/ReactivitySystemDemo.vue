<template>
  <div class="reactivity-demo">
    <div class="demo-content">
      <h3>⚡ Reactivity System</h3>
      <p>This step shows how Vue tracks dependencies and triggers updates.</p>
      
      <div class="demo-visualization">
        <div class="data-section">
          <h4>Reactive Data</h4>
          <div class="data-box">
            <div class="data-item">count: {{ count }}</div>
            <div class="data-item">name: "{{ name }}"</div>
            <button @click="updateData" class="update-btn">Update Data</button>
          </div>
        </div>
        
        <div class="arrow">→</div>
        
        <div class="ui-section">
          <h4>UI Updates</h4>
          <div class="ui-preview" :class="{ 'updating': isUpdating }">
            <div class="ui-element">Count: {{ count }}</div>
            <div class="ui-element">Hello {{ name }}!</div>
          </div>
        </div>
      </div>
      
      <button @click="startDemo" class="demo-button">
        Trigger Reactivity
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const count = ref(0)
const name = ref('Vue')
const isUpdating = ref(false)

const updateData = () => {
  count.value++
  name.value = name.value === 'Vue' ? 'React' : 'Vue'
  
  isUpdating.value = true
  setTimeout(() => {
    isUpdating.value = false
  }, 1000)
}

const startDemo = () => {
  updateData()
  console.log('Reactivity demo started')
}
</script>

<style scoped>
.reactivity-demo {
  padding: 2rem;
  text-align: center;
}

.demo-visualization {
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: 2rem 0;
  gap: 1rem;
}

.data-section, .ui-section {
  flex: 1;
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
  border: 2px solid #e9ecef;
}

.data-box {
  background: white;
  padding: 1rem;
  border-radius: 4px;
  border: 1px solid #ddd;
}

.data-item {
  background: #a855f7;
  color: white;
  padding: 0.5rem 1rem;
  margin: 0.5rem 0;
  border-radius: 4px;
  font-family: monospace;
}

.update-btn {
  background: #a855f7;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 0.5rem;
}

.ui-preview {
  background: white;
  padding: 1rem;
  border-radius: 4px;
  border: 1px solid #ddd;
  transition: all 0.3s ease;
}

.ui-preview.updating {
  background: #fef3c7;
  border-color: #f59e0b;
  animation: pulse 1s ease-in-out;
}

.ui-element {
  background: #f3f4f6;
  padding: 0.5rem 1rem;
  margin: 0.5rem 0;
  border-radius: 4px;
  border: 1px solid #d1d5db;
}

.arrow {
  font-size: 2rem;
  color: #a855f7;
  font-weight: bold;
}

.demo-button {
  background: #a855f7;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s ease;
}

.demo-button:hover {
  background: #9333ea;
  transform: translateY(-2px);
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

@media (max-width: 768px) {
  .demo-visualization {
    flex-direction: column;
  }
  
  .arrow {
    transform: rotate(90deg);
  }
}
</style> 