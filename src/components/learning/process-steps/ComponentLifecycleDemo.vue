<template>
  <div class="lifecycle-demo">
    <div class="demo-content">
      <h3>🔄 Component Lifecycle</h3>
      <p>This step shows the lifecycle phases of a Vue component.</p>
      
      <div class="demo-visualization">
        <div class="lifecycle-stages">
          <div 
            v-for="(stage, index) in lifecycleStages" 
            :key="stage.id"
            :class="[
              'stage',
              { 'active': currentStage === index },
              { 'completed': index < currentStage }
            ]"
          >
            <div class="stage-icon">{{ stage.icon }}</div>
            <div class="stage-name">{{ stage.name }}</div>
            <div class="stage-description">{{ stage.description }}</div>
          </div>
        </div>
        
        <div class="component-state">
          <h4>Component State</h4>
          <div class="state-display">
            <div class="state-item">
              <span class="label">Status:</span>
              <span class="value">{{ currentStageData.status }}</span>
            </div>
            <div class="state-item">
              <span class="label">DOM:</span>
              <span class="value">{{ currentStageData.dom }}</span>
            </div>
            <div class="state-item">
              <span class="label">Data:</span>
              <span class="value">{{ currentStageData.data }}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div class="lifecycle-controls">
        <button @click="startLifecycle" :disabled="isRunning" class="demo-button">
          {{ isRunning ? 'Running...' : 'Start Lifecycle' }}
        </button>
        <button @click="resetLifecycle" class="demo-button secondary">
          Reset
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const currentStage = ref(0)
const isRunning = ref(false)

const lifecycleStages = [
  {
    id: 'created',
    name: 'Created',
    icon: '🎯',
    description: 'Component instance created',
    status: 'Initializing',
    dom: 'Not mounted',
    data: 'Available'
  },
  {
    id: 'mounted',
    name: 'Mounted',
    icon: '🏠',
    description: 'Component added to DOM',
    status: 'Active',
    dom: 'Mounted',
    data: 'Reactive'
  },
  {
    id: 'updated',
    name: 'Updated',
    icon: '🔄',
    description: 'Component re-rendered',
    status: 'Updating',
    dom: 'Updated',
    data: 'Changed'
  },
  {
    id: 'unmounted',
    name: 'Unmounted',
    icon: '💀',
    description: 'Component removed from DOM',
    status: 'Destroyed',
    dom: 'Removed',
    data: 'Cleaned up'
  }
]

const currentStageData = computed(() => {
  return lifecycleStages[currentStage.value] || lifecycleStages[0]
})

const startLifecycle = async () => {
  if (isRunning.value) return
  
  isRunning.value = true
  currentStage.value = 0
  
  for (let i = 0; i < lifecycleStages.length; i++) {
    currentStage.value = i
    await new Promise(resolve => setTimeout(resolve, 1500))
  }
  
  isRunning.value = false
}

const resetLifecycle = () => {
  currentStage.value = 0
  isRunning.value = false
}
</script>

<style scoped>
.lifecycle-demo {
  padding: 2rem;
  text-align: center;
}

.demo-visualization {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
  margin: 2rem 0;
  align-items: start;
}

.lifecycle-stages {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.stage {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: #f8f9fa;
  border: 2px solid #e9ecef;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.stage.active {
  background: #dbeafe;
  border-color: #3b82f6;
  transform: scale(1.02);
}

.stage.completed {
  background: #dcfce7;
  border-color: #22c55e;
}

.stage-icon {
  font-size: 2rem;
  flex-shrink: 0;
}

.stage-name {
  font-weight: 600;
  font-size: 1.1rem;
  color: #1f2937;
  min-width: 80px;
  text-align: left;
}

.stage-description {
  color: #6b7280;
  text-align: left;
  flex: 1;
}

.component-state {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
  border: 2px solid #e9ecef;
  height: fit-content;
}

.state-display {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 1rem;
}

.state-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  background: white;
  border-radius: 4px;
  border: 1px solid #d1d5db;
}

.label {
  font-weight: 600;
  color: #374151;
}

.value {
  color: #6b7280;
  font-family: monospace;
  background: #f3f4f6;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.9rem;
}

.lifecycle-controls {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
}

.demo-button {
  background: #14b8a6;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s ease;
}

.demo-button:hover:not(:disabled) {
  background: #0f766e;
  transform: translateY(-2px);
}

.demo-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.demo-button.secondary {
  background: #6b7280;
}

.demo-button.secondary:hover {
  background: #4b5563;
}

@media (max-width: 768px) {
  .demo-visualization {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .stage {
    flex-direction: column;
    text-align: center;
    gap: 0.5rem;
  }
  
  .stage-name, .stage-description {
    text-align: center;
  }
  
  .lifecycle-controls {
    flex-direction: column;
    align-items: center;
  }
}
</style> 