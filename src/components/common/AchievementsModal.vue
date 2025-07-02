<template>
  <div class="modal-overlay" @click="$emit('close')">
    <div class="modal-container" @click.stop>
      <div class="modal-header">
        <h2 class="modal-title">🏆 Your Achievements</h2>
        <button 
          @click="$emit('close')" 
          class="modal-close"
          title="Close achievements"
        >
          ×
        </button>
      </div>
      
      <div class="modal-content">
        <div v-if="achievements.length === 0" class="no-achievements">
          <div class="no-achievements-icon">🎯</div>
          <h3>No achievements yet!</h3>
          <p>Complete tutorial sections to unlock achievements.</p>
        </div>
        
        <div v-else class="achievements-grid">
          <div
            v-for="achievement in achievements"
            :key="achievement.id"
            class="achievement-item"
          >
            <div class="achievement-icon">{{ achievement.icon }}</div>
            <div class="achievement-details">
              <h4 class="achievement-title">{{ achievement.title }}</h4>
              <p class="achievement-description">{{ achievement.description }}</p>
              <span class="achievement-date">{{ formatDate(achievement.unlockedAt) }}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div class="modal-footer">
        <button @click="$emit('close')" class="close-button">
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  achievements: {
    type: Array,
    default: () => []
  }
})

defineEmits(['close'])

const formatDate = (date) => {
  if (!date) return 'Just now'
  return new Date(date).toLocaleDateString()
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
}

.modal-container {
  background: white;
  border-radius: 16px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
  max-width: 600px;
  width: 100%;
  max-height: 80vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem;
  border-bottom: 2px solid #f1f5f9;
}

.modal-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0;
  color: #1e293b;
}

.modal-close {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #64748b;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.3s ease;
}

.modal-close:hover {
  background: #f1f5f9;
  color: #1e293b;
}

.modal-content {
  flex: 1;
  overflow-y: auto;
  padding: 1.5rem;
}

.no-achievements {
  text-align: center;
  padding: 2rem;
}

.no-achievements-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.no-achievements h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #374151;
  margin: 0 0 0.5rem 0;
}

.no-achievements p {
  color: #64748b;
  margin: 0;
}

.achievements-grid {
  display: grid;
  gap: 1rem;
}

.achievement-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1rem;
  background: linear-gradient(135deg, #fef7ff, #f3e8ff);
  border: 2px solid #e879f9;
  border-radius: 12px;
}

.achievement-icon {
  font-size: 2rem;
  flex-shrink: 0;
}

.achievement-details {
  flex: 1;
}

.achievement-title {
  font-size: 1rem;
  font-weight: 600;
  color: #1e293b;
  margin: 0 0 0.25rem 0;
}

.achievement-description {
  font-size: 0.875rem;
  color: #64748b;
  margin: 0 0 0.5rem 0;
  line-height: 1.4;
}

.achievement-date {
  font-size: 0.75rem;
  color: #94a3b8;
  font-style: italic;
}

.modal-footer {
  padding: 1.5rem;
  border-top: 2px solid #f1f5f9;
  display: flex;
  justify-content: flex-end;
}

.close-button {
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.75rem 1.5rem;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.close-button:hover {
  background: #2563eb;
  transform: translateY(-1px);
}

@media (max-width: 640px) {
  .modal-container {
    margin: 1rem;
    max-height: 90vh;
  }
  
  .modal-header,
  .modal-content,
  .modal-footer {
    padding: 1rem;
  }
  
  .achievement-item {
    flex-direction: column;
    text-align: center;
  }
}
</style> 