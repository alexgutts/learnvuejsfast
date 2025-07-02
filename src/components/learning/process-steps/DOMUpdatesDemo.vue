<template>
  <div class="dom-updates-demo">
    <div class="demo-content">
      <h3>🎯 DOM Updates</h3>
      <p>This step shows how Vue applies minimal changes to the real DOM.</p>
      
      <div class="demo-visualization">
        <div class="patch-list">
          <h4>Patch Operations</h4>
          <div class="operations">
            <div class="operation add">+ Insert Item 1.5 at position 1</div>
            <div class="operation update">~ Update Item 2 text content</div>
            <div class="operation keep">= Keep Item 1, 3 unchanged</div>
          </div>
        </div>
        
        <div class="arrow">→</div>
        
        <div class="real-dom">
          <h4>Real DOM</h4>
          <div class="dom-elements" :class="{ 'updating': isUpdating }">
            <div class="element">Item 1</div>
            <div class="element new" v-if="showNew">Item 1.5</div>
            <div class="element" :class="{ 'updated': isUpdating }">
              {{ isUpdating ? 'Item 2 Updated' : 'Item 2' }}
            </div>
            <div class="element">Item 3</div>
          </div>
        </div>
      </div>
      
      <div class="performance-info">
        <h4>⚡ Performance Benefits</h4>
        <div class="stats">
          <div class="stat">
            <span class="number">3</span>
            <span class="label">Total Elements</span>
          </div>
          <div class="stat">
            <span class="number">2</span>
            <span class="label">Operations Needed</span>
          </div>
          <div class="stat">
            <span class="number">66%</span>
            <span class="label">Work Saved</span>
          </div>
        </div>
      </div>
      
      <button @click="startDemo" class="demo-button">
        Apply DOM Updates
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const isUpdating = ref(false)
const showNew = ref(false)

const startDemo = async () => {
  isUpdating.value = true
  
  setTimeout(() => {
    showNew.value = true
  }, 500)
  
  setTimeout(() => {
    isUpdating.value = false
  }, 1500)
  
  console.log('DOM updates demo started')
}
</script>

<style scoped>
.dom-updates-demo {
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

.patch-list, .real-dom {
  flex: 1;
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
  border: 2px solid #e9ecef;
}

.operations {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.operation {
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-weight: 500;
  text-align: left;
  font-family: monospace;
  font-size: 0.9rem;
}

.operation.add {
  background: #dcfce7;
  color: #16a34a;
  border-left: 4px solid #22c55e;
}

.operation.update {
  background: #fef3c7;
  color: #d97706;
  border-left: 4px solid #f59e0b;
}

.operation.keep {
  background: #f3f4f6;
  color: #6b7280;
  border-left: 4px solid #d1d5db;
}

.dom-elements {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.element {
  background: white;
  padding: 0.75rem 1rem;
  border-radius: 4px;
  border: 1px solid #d1d5db;
  transition: all 0.3s ease;
}

.element.new {
  background: #dcfce7;
  border-color: #22c55e;
  animation: slideIn 0.5s ease-out;
}

.element.updated {
  background: #fef3c7;
  border-color: #f59e0b;
  animation: highlight 0.5s ease-out;
}

.dom-elements.updating {
  animation: updating 1.5s ease-in-out;
}

.arrow {
  font-size: 2rem;
  color: #ef4444;
  font-weight: bold;
}

.performance-info {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
  border: 2px solid #e9ecef;
  margin: 1rem 0;
}

.stats {
  display: flex;
  justify-content: space-around;
  margin-top: 1rem;
}

.stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.number {
  font-size: 2rem;
  font-weight: bold;
  color: #ef4444;
}

.label {
  font-size: 0.9rem;
  color: #6b7280;
  font-weight: 500;
}

.demo-button {
  background: #ef4444;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s ease;
}

.demo-button:hover {
  background: #dc2626;
  transform: translateY(-2px);
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes highlight {
  0%, 100% {
    background: #fef3c7;
  }
  50% {
    background: #fbbf24;
  }
}

@keyframes updating {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.02);
  }
}

@media (max-width: 768px) {
  .demo-visualization {
    flex-direction: column;
  }
  
  .arrow {
    transform: rotate(90deg);
  }
  
  .stats {
    flex-direction: column;
    gap: 1rem;
  }
}
</style> 