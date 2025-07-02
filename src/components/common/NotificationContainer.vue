<template>
  <div class="notification-container">
    <div
      v-for="notification in notifications"
      :key="notification.id"
      :class="[
        'notification',
        `notification--${notification.type || 'info'}`
      ]"
    >
      <div class="notification-content">
        <h4 class="notification-title">{{ notification.title }}</h4>
        <p class="notification-message">{{ notification.message }}</p>
      </div>
      <button 
        @click="$emit('close-notification', notification.id)"
        class="notification-close"
        title="Close notification"
      >
        ×
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  notifications: {
    type: Array,
    default: () => []
  }
})

defineEmits(['close-notification'])
</script>

<style scoped>
.notification-container {
  position: fixed;
  top: 1rem;
  right: 1rem;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  max-width: 400px;
}

.notification {
  background: white;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  border: 2px solid #e5e7eb;
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  animation: slideIn 0.3s ease-out;
}

.notification--success {
  border-color: #10b981;
  background: linear-gradient(135deg, #ecfdf5, #f0fdf4);
}

.notification--error {
  border-color: #ef4444;
  background: linear-gradient(135deg, #fef2f2, #fee2e2);
}

.notification--warning {
  border-color: #f59e0b;
  background: linear-gradient(135deg, #fffbeb, #fef3c7);
}

.notification-content {
  flex: 1;
}

.notification-title {
  font-size: 0.875rem;
  font-weight: 600;
  margin: 0 0 0.25rem 0;
  color: #374151;
}

.notification-message {
  font-size: 0.8rem;
  margin: 0;
  color: #6b7280;
  line-height: 1.4;
}

.notification-close {
  background: none;
  border: none;
  font-size: 1.25rem;
  cursor: pointer;
  color: #9ca3af;
  line-height: 1;
  padding: 0;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.notification-close:hover {
  color: #374151;
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
</style> 