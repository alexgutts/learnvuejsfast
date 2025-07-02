<!--
  Modern Theme Toggle Button - Redesigned for better UX
  
  Key improvements:
  - Clean, modern design without heavy styling
  - Better accessibility with proper ARIA attributes
  - Consistent with our design system
  - Smooth animations and micro-interactions
  - Clear visual feedback and states
  - Professional appearance
-->

<template>
  <div class="theme-toggle-wrapper">
    <!-- Main toggle button with modern styling -->
    <button
      @click="toggleTheme"
      :class="[
        'theme-toggle',
        { 'theme-toggle--dark': isDarkMode }
      ]"
      :title="isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'"
      :aria-label="isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'"
      :aria-pressed="isDarkMode"
      type="button"
    >
      <!-- Icon container with smooth transitions -->
      <div class="toggle-icon-container">
        <!-- Sun icon for light mode -->
        <svg
          v-show="!isDarkMode"
          class="toggle-icon toggle-icon--sun"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="5"/>
          <line x1="12" y1="1" x2="12" y2="3"/>
          <line x1="12" y1="21" x2="12" y2="23"/>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
          <line x1="1" y1="12" x2="3" y2="12"/>
          <line x1="21" y1="12" x2="23" y2="12"/>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
        </svg>
        
        <!-- Moon icon for dark mode -->
        <svg
          v-show="isDarkMode"
          class="toggle-icon toggle-icon--moon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
        </svg>
      </div>
      
      <!-- Label text with better typography -->
      <span class="toggle-label">
        {{ isDarkMode ? 'Dark' : 'Light' }} Mode
      </span>
    </button>
    
    <!-- Optional description with better styling -->
    <p v-if="showDescription" class="toggle-description">
      Experience Vue's reactivity system - watch the UI update automatically when you toggle themes!
    </p>
  </div>
</template>

<script setup>
/**
 * Modern Theme Toggle Component
 * 
 * This redesigned component demonstrates:
 * - Clean, professional UI design
 * - Better accessibility and user experience
 * - Consistent with modern design systems
 * - Smooth animations and micro-interactions
 * - Proper state management and event handling
 */

import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { useNotifications } from '../../composables/useNotifications.js'

/**
 * COMPONENT CONFIGURATION
 * =====================
 * Using Vue 3's script setup syntax for cleaner, more maintainable code
 * This modern approach provides better TypeScript support and runtime performance
 */

/**
 * PROPS DEFINITION
 * ==============
 * Props are the way components receive data from their parents
 * Vue 3 provides runtime validation and TypeScript support
 */
const props = defineProps({
  // Initial theme mode
  initialMode: {
    type: String,
    default: 'light',
    validator: (value) => ['light', 'dark'].includes(value)
  },
  // Whether to show description text
  showDescription: {
    type: Boolean,
    default: true
  },
  // Whether to persist theme choice
  persistTheme: {
    type: Boolean,
    default: true
  }
})

/**
 * EVENTS DEFINITION
 * ===============
 * Events allow child components to communicate with their parents
 * defineEmits declares which events this component can emit
 */
const emit = defineEmits(['theme-changed'])

/**
 * COMPOSABLES INTEGRATION
 * =====================
 * Composables are reusable pieces of logic in Vue 3
 * They help keep components clean and maintainable
 */
const { showInteractiveFeedback } = useNotifications()

/**
 * REACTIVE STATE
 * ============
 * ref() creates reactive references that trigger UI updates when changed
 */
const currentTheme = ref(props.initialMode)

/**
 * COMPUTED PROPERTIES
 * =================
 * Computed properties automatically update when their dependencies change
 * They're perfect for derived values and conditional logic
 */

// Determines if dark mode is active
const isDarkMode = computed(() => currentTheme.value === 'dark')

// Theme data object for external use
const themeData = computed(() => ({
  mode: currentTheme.value,
  isDark: isDarkMode.value,
  label: isDarkMode.value ? 'Dark Mode' : 'Light Mode',
  icon: isDarkMode.value ? 'moon' : 'sun'
}))

/**
 * WATCHERS
 * =======
 * watch() lets you react to data changes
 * Perfect for side effects like saving to localStorage
 */
watch(currentTheme, (newTheme) => {
  if (props.persistTheme) {
    localStorage.setItem('preferred-theme', newTheme)
  }
  
  // Emit change event to parent
  emit('theme-changed', {
    theme: newTheme,
    isDark: newTheme === 'dark'
  })
  
  // Show feedback to user
  showInteractiveFeedback(
    'Theme Updated',
    `Switched to ${newTheme} mode`
  )
})

/**
 * COMPONENT METHODS
 * ===============
 * Methods handle user interactions and component logic
 */

/**
 * Toggle between light and dark themes
 * Demonstrates Vue's reactive state updates and modern UX patterns
 */
const toggleTheme = () => {
  // Toggle theme
  currentTheme.value = currentTheme.value === 'light' ? 'dark' : 'light'
  
  // Add haptic feedback if available
  if (window.navigator.vibrate) {
    window.navigator.vibrate(50)
  }
}

/**
 * LIFECYCLE HOOKS
 * =============
 * Hooks let you run code at specific times in a component's life
 */
onMounted(() => {
  // Load saved theme preference
  if (props.persistTheme) {
    const savedTheme = localStorage.getItem('preferred-theme')
    if (savedTheme) {
      currentTheme.value = savedTheme
    }
  }
  
  // Listen for system theme changes
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
  const handleChange = (e) => {
    if (!props.persistTheme) {
      currentTheme.value = e.matches ? 'dark' : 'light'
    }
  }
  
  mediaQuery.addEventListener('change', handleChange)
  
  // Cleanup listener on component unmount
  onUnmounted(() => {
    mediaQuery.removeEventListener('change', handleChange)
  })
})
</script>

<style scoped>
/* Modern Theme Toggle Styles */
.theme-toggle-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-3);
}

/* Main toggle button with modern design */
.theme-toggle {
  /* Reset button styles */
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  
  /* Modern button styling */
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-3) var(--space-4);
  
  /* Clean background and border */
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  
  /* Typography */
  color: var(--color-text-primary);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  
  /* Smooth transitions */
  transition: all var(--transition-fast);
  
  /* Better focus styles */
  outline: none;
  
  /* Subtle shadow for depth */
  box-shadow: var(--shadow-sm);
}

/* Hover state for better interactivity */
.theme-toggle:hover {
  background-color: var(--color-background-secondary);
  border-color: var(--color-border-focus);
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}

/* Active state feedback */
.theme-toggle:active {
  transform: translateY(0);
  box-shadow: var(--shadow-sm);
}

/* Focus styles for accessibility */
.theme-toggle:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

/* Dark mode specific styling */
.theme-toggle--dark {
  background-color: var(--color-gray-800);
  border-color: var(--color-gray-600);
  color: var(--color-gray-100);
}

.theme-toggle--dark:hover {
  background-color: var(--color-gray-700);
  border-color: var(--color-primary);
}

/* Icon container with smooth animations */
.toggle-icon-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  position: relative;
}

/* Icon styling with smooth transitions */
.toggle-icon {
  width: 18px;
  height: 18px;
  color: currentColor;
  transition: all var(--transition-normal);
}

/* Sun icon specific styling */
.toggle-icon--sun {
  color: var(--color-warning);
}

/* Moon icon specific styling */
.toggle-icon--moon {
  color: var(--color-primary);
}

/* Label text styling */
.toggle-label {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: currentColor;
  line-height: var(--line-height-tight);
}

/* Description text with better typography */
.toggle-description {
  max-width: 300px;
  text-align: center;
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
  line-height: var(--line-height-relaxed);
  margin: 0;
  padding: var(--space-2) var(--space-4);
  background-color: var(--color-background-secondary);
  border-radius: var(--radius-md);
  border-left: 3px solid var(--color-primary);
}

/* Responsive adjustments */
@media (max-width: 480px) {
  .theme-toggle {
    padding: var(--space-2) var(--space-3);
    gap: var(--space-2);
  }
  
  .toggle-icon {
    width: 16px;
    height: 16px;
  }
  
  .toggle-label {
    font-size: var(--font-size-xs);
  }
  
  .toggle-description {
    font-size: 11px;
    padding: var(--space-2) var(--space-3);
  }
}

/* Animation for theme transitions */
@keyframes themeTransition {
  0% {
    opacity: 0.8;
    transform: scale(0.95);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

.theme-toggle {
  animation: themeTransition 0.2s ease-out;
}

/* Improved accessibility for reduced motion */
@media (prefers-reduced-motion: reduce) {
  .theme-toggle,
  .toggle-icon,
  .toggle-description {
    transition: none;
    animation: none;
  }
}
</style> 